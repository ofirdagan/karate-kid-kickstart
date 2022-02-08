let editedID = 0;
let editMode = false;

function getNewID(){
    return new Date().getTime().toString()
}
function addItem(){
    const title = getValue('title-input')
    if (title == ''){
        alert('cant add an item without a title')
        return
    }
    if (editMode){
        alert('cant add an item while in edit mode')
        return
    }
    const content = getValue('content-input')
    const list = document.getElementById('list')
    const id = getNewID()
    const itemElement = createTodoItemElement(id,title,content)

    list.appendChild(itemElement)
    // now save to local storage
    const itemString = `title: ${title};content: ${content}`
    localStorage.setItem(id,itemString)

    // reset menu display
    clearMenu()
    setInnerText('menu-button','Add')
}

function sendItemToEdit(itemID){
    
    editedID = itemID
    const title = getInnerText(`title${itemID}`)
    const content = getInnerText(`content${itemID}`)
    setValue('title-input',title)
    setValue('content-input',content)
    
    editMode = true
    document.getElementById('cancel-button').hidden = false
    setInnerText('menu-button','Apply')
}

function deleteItem(itemID){
    if(editMode){
        alert('cant delete while in edit mode')
        return
    }
    const item = document.getElementById(itemID)
    const list = document.getElementById('list')
    // remove from display
    list.removeChild(item)
    // remove from item storage
    localStorage.removeItem(itemID)
}

function cancelEdit(){
    clearMenu()
    editMode = false
    setInnerText('menu-button','Add')
    document.getElementById('cancel-button').hidden = true
    editedID = 0  
}

function clearMenu(){
    setValue('title-input','')
    setValue('content-input','')
}

function menuButtonClick(){
    if(!editMode){
        // adding a new item
        addItem()
    }else{
        // editing an existing item
        if (getValue('title-input')==''){
            alert('cant set an empty title')
            return
        }
        const title = getValue('title-input')
        const content = getValue('content-input')
        setInnerText(`title${editedID}`,title)
        setInnerText(`content${editedID}`,content)
        // now update item in local storage
        const itemObject = `title: ${title};content: ${content}`
        localStorage.setItem(editedID,itemObject)
        // revert menu back to default state
        clearMenu()
        editMode = false
        setInnerText('menu-button','Add')
        document.getElementById('cancel-button').hidden = true
        editedID = 0
    }
}
function addButton(){
    clearMenu()
    document.getElementById('title-input').focus()
}
function getValue(id){
    return document.getElementById(id).value
}
function setValue(id,value){
    document.getElementById(id).value = value
}
function getInnerText(id){
    return document.getElementById(id).innerText
}
function setInnerText(id,text){
    document.getElementById(id).innerText = text
}
function createTodoItemElement(itemID,title,content){
    // ol todo-item
    const itemElement = document.createElement('ol')
    itemElement.className = 'todo-item'
    itemElement.id = itemID;
    // input checkbox
    const itemCheckboxElement = document.createElement('input')
    itemCheckboxElement.type = 'checkbox'
    itemCheckboxElement.className = 'item-checkbox'
    // div todo-item-text
    const itemTextElement = createItemTextElement(itemID,title,content)
    const itemButtonsElement = createItemButtonsElement(itemID)
    // append checkbox, text and buttons to list-item
    itemElement.appendChild(itemCheckboxElement)
    itemElement.appendChild(itemTextElement)
    itemElement.appendChild(itemButtonsElement)

    return itemElement
}
function createItemButtonsElement(itemID){

    const itemButtonsElement = document.createElement('div')
    itemButtonsElement.className = 'todo-item-buttons'
    // button edit
    const editButtonElement = document.createElement('button')
    editButtonElement.innerText = 'edit'
    editButtonElement.className = 'item-edit-button'
    editButtonElement.onclick = function(){
        // set menu to editing state
        editMode = true
        editedID = itemID
        document.getElementById('cancel-button').hidden = false
        setInnerText('menu-button','Apply')
        const title = getInnerText(`title${itemID}`)
        const content = getInnerText(`content${itemID}`)
        setValue('title-input',title)
        setValue('content-input',content)
    }
    // button delete
    const deleteButtonElement = document.createElement('button')
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.className = 'item-delete-button'
    deleteButtonElement.setAttribute('onclick',`deleteItem(${itemID})`)
    deleteButtonElement.onclick = function(){
        if(editMode){
            alert('cant delete while in edit mode')
            return
        }
        const item = document.getElementById(itemID)
        const list = document.getElementById('list')
        // remove from display
        list.removeChild(item)
        // remove from item storage
        localStorage.removeItem(itemID)
    }
    // append the buttons to container
    itemButtonsElement.appendChild(editButtonElement)
    itemButtonsElement.appendChild(deleteButtonElement)

    return itemButtonsElement
}
function createItemTextElement(itemID,title,content){

    const itemTextElement = document.createElement('div')
    itemTextElement.className = 'todo-item-text'
    // item title
    const titleElement = document.createElement('div')
    titleElement.innerText = title
    titleElement.className = 'todo-item-title'
    titleElement.id = 'title'+itemID
    // item content
    const contentElement = document.createElement('div')
    contentElement.innerText = content
    contentElement.className = 'todo-item-content'
    contentElement.id = 'content'+itemID
    // append text to parent container 
    itemTextElement.appendChild(titleElement)
    itemTextElement.appendChild(contentElement)

    return itemTextElement
}

window.onload = function(){
    // attach functions to menu buttons
    document.getElementById('menu').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            document.getElementById('menu-button').click()
            document.getElementById('title-input').focus()
        }
    })
    document.getElementById('clear-button').onclick = clearMenu
    document.getElementById('menu-button').onclick = menuButtonClick
    document.getElementById('cancel-button').onclick = cancelEdit
    document.getElementById('add-button').onclick = addButton
    // load and display todo items from local storage
    const list = document.getElementById('list')
    for (const key in localStorage) {
        if(isNaN(Number(key)))
            continue;
        const itemString = localStorage.getItem(key).split(';')
        const title = itemString[0].split(':')[1]
        const content = itemString[1].split(':')[1]
        const itemElement = createTodoItemElement(Number(key),title,content)
        list.appendChild(itemElement)
    }
}
