let editedID = 0;
let editMode = false;

function getNewID(){
    return Math.floor(Math.random()*1000)
}
function addItem(){
    let title = document.getElementById('title-input').value
    if (title ==''){
        alert('cant add an item without a title')
        return
    }
    if (editMode){
        alert('cant add an item while in edit mode')
        return
    }
    let content = document.getElementById('content-input').value
    let list = document.getElementById('list')
    let id = getNewID()
    let itemElement = createTodoItemElement(id,title,content)

    list.appendChild(itemElement)
    // now save to local storage
    let itemString = `title: ${title};content: ${content}`
    localStorage.setItem(id,itemString)

    // reset menu display
    clearMenu()
    document.getElementById('menu-button').innerText = 'add item'
}

function sendItemToEdit(itemID){
    editedID = itemID
    document.getElementById('title-input').value = document.getElementById(`title${itemID}`).innerText
    document.getElementById('content-input').value = document.getElementById(`content${itemID}`).innerText
    editMode = true //to disable item deletion
    document.getElementById('cancel-button').hidden = false // to exit edit mode
    document.getElementById('menu-button').innerText = 'add changes' // to save changes and exit edit mode
}

function deleteItem(itemID){
    if(editMode){
        alert('cant delete while in edit mode')
        return
    }
    let item = document.getElementById(itemID)
    let list = document.getElementById('list')
    // remove from display
    list.removeChild(item)
    // remove from item storage
    localStorage.removeItem(itemID)
}

function cancelEdit(){
    clearMenu()
    editMode = false
    document.getElementById('menu-button').innerText = 'add item'
    document.getElementById('cancel-button').hidden = true
    editedID = 0  
}

function clearMenu(){
    document.getElementById('title-input').value = ''
    document.getElementById('content-input').value = ''
}

function menuButtonClick(){
    if(!editMode){
        addItem()
    }else{
        if (document.getElementById('title-input').value == ''){
            alert('cant set an empty title')
            return
        }
        let title = document.getElementById('title-input').value
        let content = document.getElementById('content-input').value
        document.getElementById(`title${editedID}`).innerText = title
        document.getElementById(`content${editedID}`).innerText  = content
        // now update item in local storage
        let itemObject = `title: ${title};content: ${content}`
        localStorage.setItem(editedID,itemObject)

        clearMenu()
        editMode = false
        document.getElementById('menu-button').innerText = 'add item'
        document.getElementById('cancel-button').hidden = true
        editedID = 0
    }
}
function addButton(){
    clearMenu()
    document.getElementById('title-input').focus()
}
function createTodoItemElement(itemID,title,content){

    // ol todo-item
    let itemElement = document.createElement('ol')
    itemElement.className = 'todo-item'
    itemElement.id = itemID;
    // input checkbox
    let itemCheckboxElement = document.createElement('input')
    itemCheckboxElement.type = 'checkbox'
    itemCheckboxElement.className = 'item-checkbox'
    // div todo-item-text
    let itemTextElement = createItemTextElement(itemID,title,content)
    let itemButtonsElement = createItemButtonsElement(itemID)
    //append checkbox, text and buttons to list-item
    itemElement.appendChild(itemCheckboxElement)
    itemElement.appendChild(itemTextElement)
    itemElement.appendChild(itemButtonsElement)

    return itemElement
}
function createItemButtonsElement(itemID){

    let itemButtonsElement = document.createElement('div')
    itemButtonsElement.className = 'todo-item-buttons'
    // button edit
    let editButtonElement = document.createElement('button')
    editButtonElement.innerText = 'edit'
    editButtonElement.className = 'item-edit-button'
    editButtonElement.setAttribute('onclick',`sendItemToEdit(${itemID})`)
    // button delete
    let deleteButtonElement = document.createElement('button')
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.className = 'item-delete-button'
    deleteButtonElement.setAttribute('onclick',`deleteItem(${itemID})`)
    // append the buttons to container
    itemButtonsElement.appendChild(editButtonElement)
    itemButtonsElement.appendChild(deleteButtonElement)

    return itemButtonsElement
}
 function createItemTextElement(itemID,title,content){

    let itemTextElement = document.createElement('div')
    itemTextElement.className = 'todo-item-text'
    // item title
    let titleElement = document.createElement('div')
    titleElement.innerText = title
    titleElement.className = 'todo-item-title'
    titleElement.id = 'title'+itemID
    // item content
    let contentElement = document.createElement('div')
    contentElement.innerText = content
    contentElement.className = 'todo-item-content'
    contentElement.id = 'content'+itemID
    // append text to parent container 
    itemTextElement.appendChild(titleElement)
    itemTextElement.appendChild(contentElement)

    return itemTextElement
 }
// attach functions to menu buttons
window.onload = function(){
    document.getElementById('clear-button').setAttribute('onclick','clearMenu()')
    document.getElementById('menu-button').setAttribute('onclick','menuButtonClick()')
    document.getElementById('cancel-button').setAttribute('onclick','cancelEdit()')
    document.getElementById('add-button').setAttribute('onclick','addButton()')
    // load display todo items from local storage
    let list = document.getElementById('list')
    for (let key in localStorage) {
        if(isNaN(Number(key)))
            continue;
        let itemString = localStorage.getItem(key)
        itemString = itemString.split(';')
        let title = itemString[0].split(':')[1]
        let content = itemString[1].split(':')[1]
        let itemElement = createTodoItemElement(Number(key),title,content)
        list.appendChild(itemElement)
    }
}