const storage = require('./modules/storage.js')
const {getValue,setValue,getInnerText,setInnerText} = require('./modules/helper-functions.js')
const {classes} = require('./jss/list-jss.js')

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

    clearMenu()
    setInnerText('apply-button','Add')
}
function deleteCheckedItems(){
    const itemList = storage.getAll()
    const list = document.getElementById('list')
    for (const id in itemList) {
        const checkbox = document.getElementById(`itemCheckbox${id}`)
        if(checkbox.checked){
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
        addItem()
    }else{
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

    const itemElement = document.createElement('ol')
    itemElement.className = classes.todoItem
    itemElement.id = itemID;

    const itemCheckboxElement = createItemCheckboxElement(itemID)
    const itemTextElement = createItemTextElement(itemID,title,content)
    const itemButtonsElement = createItemButtonsElement(itemID)

    itemElement.appendChild(itemCheckboxElement)
    itemElement.appendChild(itemTextElement)
    itemElement.appendChild(itemButtonsElement)

    return itemElement
}
function createItemCheckboxElement(itemID){
    const itemCheckboxElement = document.createElement('input')
    itemCheckboxElement.type = 'checkbox'
    itemCheckboxElement.className = classes.itemCheckbox
    itemCheckboxElement.id = `itemCheckbox${itemID}`
    itemCheckboxElement.onclick = function(){
        const titleElement = document.getElementById(`title${itemID}`)
        const contentElement = document.getElementById(`content${itemID}`)
        const editButtonElement = document.getElementById(`itemEdit${itemID}`)
        if(titleElement.classList.contains(classes.strike)
            || contentElement.classList.contains(classes.invisible)
            || editButtonElement.classList.contains(classes.invisible)){

                titleElement.classList.remove(classes.strike)
                contentElement.classList.remove(classes.invisible)
                editButtonElement.classList.remove(classes.invisible)
        }else{
            titleElement.classList.add(classes.strike)
            contentElement.classList.add(classes.invisible)
            editButtonElement.classList.add(classes.invisible)
        }
    }
    return itemCheckboxElement
} 
function createItemButtonsElement(itemID){

    const itemButtonsElement = document.createElement('div')
    itemButtonsElement.className = classes.todoItemButtons

    const editButtonElement = document.createElement('button')
    editButtonElement.id = `itemEdit${itemID}`
    editButtonElement.innerText = 'edit'
    editButtonElement.className = classes.itemEditButton
    editButtonElement.onclick = function(){

        editMode = true
        editedID = itemID

        document.getElementById('cancel-button').hidden = false
        setInnerText('apply-button','Apply')
        const title = getInnerText(`title${itemID}`)
        const content = getInnerText(`content${itemID}`)
        setValue('title-input',title)
        setValue('content-input',content)
    }

    const deleteButtonElement = document.createElement('button')
    deleteButtonElement.id = `itemDelete${itemID}`
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.className = classes.itemDeleteButton
    deleteButtonElement.onclick = function(){
        if(editMode){
            alert('cant delete while in edit mode')
            return
        }
        const item = document.getElementById(itemID)
        const list = document.getElementById('list')

        list.removeChild(item)

        storage.remove(itemID)
    }

    itemButtonsElement.appendChild(editButtonElement)
    itemButtonsElement.appendChild(deleteButtonElement)

    return itemButtonsElement
}
function createItemTextElement(itemID,title,content){

    const itemTextElement = document.createElement('div')
    itemTextElement.className = classes.todoItemText

    const titleElement = document.createElement('div')
    titleElement.innerText = title
    titleElement.className = classes.todoItemTitle
    titleElement.id = `title${itemID}`

    const contentElement = document.createElement('div')
    contentElement.innerText = content
    contentElement.className = classes.todoItemContent
    contentElement.id = `content${itemID}`

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
