const storage = require('./modules/storage.js')
const {getValue,setValue,getInnerText,setInnerText} = require('./modules/helper-functions.js')

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
    storage.set(id, title,content)
    const itemElement = createTodoItemElement(id,title,content)
    list.appendChild(itemElement)
    // reset menu display
    clearMenu()
    setInnerText('apply-button','Add')
}
function deleteCheckedItems(){
    const itemList = storage.getAll()
    const list = document.getElementById('list')
    for (const id in itemList) {
        const checkbox = document.getElementById(`item-checkbox${id}`)
        if(checkbox.checked){
            console.log(id, 'is checked')
            const itemElement = document.getElementById(`${id}`)
            list.removeChild(itemElement)
            storage.remove(id)
        }
    }
}
function cancelEdit(){
    clearMenu()
    editMode = false
    setInnerText('apply-button','Add')
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
        storage.set(editedID, title, content)
        clearMenu()
        editMode = false
        setInnerText('apply-button','Add')
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
    const itemElement = document.createElement('ol')
    itemElement.className = 'todo-item'
    itemElement.id = itemID;
    // input checkbox
    const itemCheckboxElement = document.createElement('input')
    itemCheckboxElement.type = 'checkbox'
    itemCheckboxElement.className = 'item-checkbox'
    itemCheckboxElement.id = `item-checkbox${itemID}`
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
        setInnerText('apply-button','Apply')
        const title = getInnerText(`title${itemID}`)
        const content = getInnerText(`content${itemID}`)
        setValue('title-input',title)
        setValue('content-input',content)
    }
    // button delete
    const deleteButtonElement = document.createElement('button')
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.className = 'item-delete-button'
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
        storage.remove(itemID)
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
function showItemsFromLocalStorage(){
    const todoMap = storage.getAll()
    const list = document.getElementById('list')
    for (const key in todoMap) {
        const item = todoMap[key]
        const title = item['title']
        const content = item['content']
        const itemElement = createTodoItemElement(key,title,content)
        list.appendChild(itemElement)
    }
}
window.onload = function(){
    // attach functions to menu buttons
    document.getElementById('menu').addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            document.getElementById('apply-button').click()
            document.getElementById('title-input').focus()
        }
    })
    document.getElementById('clear-button').onclick = clearMenu
    document.getElementById('apply-button').onclick = menuButtonClick
    document.getElementById('cancel-button').onclick = cancelEdit
    document.getElementById('add-button').onclick = addButton
    document.getElementById('clean-button').onclick = deleteCheckedItems
    
    showItemsFromLocalStorage()
}
