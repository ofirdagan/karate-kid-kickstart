import * as storage from './modules/storage'
import {classes} from './jss/jss'
import { getValue, setValue, getInnerText, setInnerText, addEvent} from './modules/helperFunctions'
import * as constants from './modules/constants'
let editedID = 0;
let editMode = false;

function getNewID(){
    return new Date().getTime().toString()
}
function addItem(){
    const title = getValue(constants.titleInputID)
    if (title == ''){
        alert('cant add an item without a title')
        return
    }
    if (editMode){
        alert('cant add an item while in edit mode')
        return
    }

    const content = getValue(constants.contentInputID)
    const list = document.getElementById(constants.todoListID)
    const id = getNewID()
    storage.set(id, title,content)

    const itemElement = createTodoItemElement(id,title,content)
    list.appendChild(itemElement)

    clearMenu()
    setInnerText(constants.applyButtonID,'Add')
}
function deleteCheckedItems(){
    const itemList = storage.getAll()
    const list = document.getElementById(constants.todoListID)
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
    setInnerText(constants.applyButtonID,'Add')
    document.getElementById(constants.cancelButtonID).hidden = true
    editedID = 0  
}

function clearMenu(){
    setValue(constants.titleInputID,'')
    setValue(constants.contentInputID,'')
}

function menuButtonClick(){
    if(!editMode){
        addItem()
    }else{
        if (getValue(constants.titleInputID)==''){
            alert('cant set an empty title')
            return
        }
        const title = getValue(constants.titleInputID)
        const content = getValue(constants.contentInputID)
        setInnerText(`title${editedID}`,title)
        setInnerText(`content${editedID}`,content)
        storage.set(editedID, title, content)
        clearMenu()
        editMode = false
        setInnerText(constants.applyButtonID,'Add')
        document.getElementById(constants.cancelButtonID).hidden = true
        editedID = 0
    }
}
function addButton(){
    clearMenu()
    document.getElementById(constants.titleInputID).focus()
}

function createTodoItemElement(itemID,title,content){

    const itemElement = document.createElement('ol')
    itemElement.classList.add(classes.todoItem)
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
    itemCheckboxElement.classList.add(classes.itemCheckbox)
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
    itemButtonsElement.classList.add(classes.todoItemButtons)

    const editButtonElement = document.createElement('button')
    editButtonElement.id = `itemEdit${itemID}`
    editButtonElement.innerText = 'edit'
    editButtonElement.classList.add(classes.itemEditButton)
    editButtonElement.onclick = function(){

        editMode = true
        editedID = itemID

        document.getElementById(constants.cancelButtonID).hidden = false
        setInnerText(constants.applyButtonID,'Apply')
        const title = getInnerText(`title${itemID}`)
        const content = getInnerText(`content${itemID}`)
        setValue(constants.titleInputID,title)
        setValue(constants.contentInputID,content)
    }

    const deleteButtonElement = document.createElement('button')
    deleteButtonElement.id = `itemDelete${itemID}`
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.classList.add(classes.itemDeleteButton)
    deleteButtonElement.onclick = function(){
        if(editMode){
            alert('cant delete while in edit mode')
            return
        }
        const item = document.getElementById(itemID)
        const list = document.getElementById(constants.todoListID)

        list.removeChild(item)

        storage.remove(itemID)
    }

    itemButtonsElement.appendChild(editButtonElement)
    itemButtonsElement.appendChild(deleteButtonElement)

    return itemButtonsElement
}
function createItemTextElement(itemID,title,content){

    const itemTextElement = document.createElement('div')
    itemTextElement.classList.add(classes.todoItemText)

    const titleElement = document.createElement('div')
    titleElement.innerText = title
    titleElement.classList.add(classes.todoItemTitle)
    titleElement.id = `title${itemID}`

    const contentElement = document.createElement('div')
    contentElement.innerText = content
    contentElement.classList.add(classes.todoItemContent)
    contentElement.id = `content${itemID}`

    itemTextElement.appendChild(titleElement)
    itemTextElement.appendChild(contentElement)

    return itemTextElement
}
async function showItemsFromLocalStorage(){
    const todoMap = await storage.getAll()
    console.log('todoMap: ',todoMap)
    const list = document.getElementById(constants.todoListID)
    for (const key in todoMap) {
        const item = todoMap[key]
        const title = item['title']
        const content = item['content']
        const itemElement = createTodoItemElement(key,title,content)
        list.appendChild(itemElement)
    }
}
window.onload = function(){

    document.body.addEventListener('keyup', function (event){
        if (event.keyCode === constants.escapeKeycode){
            document.getElementById(constants.cancelButtonID).click()
            document.getElementById(constants.titleInputID).focus()
        }
    })
    addEvent(constants.menuID,'keyup',function(event) {
        if (event.keyCode === constants.enterKeycode) {
            document.getElementById(constants.applyButtonID).click()
            document.getElementById(constants.titleInputID).focus()
        }
    })
    document.getElementById(constants.clearButtonID).onclick = clearMenu
    document.getElementById(constants.applyButtonID).onclick = menuButtonClick
    document.getElementById(constants.cancelButtonID).onclick = cancelEdit
    document.getElementById(constants.addButtonID).onclick = addButton
    document.getElementById(constants.cleanButtonID).onclick = deleteCheckedItems
    
    showItemsFromLocalStorage()
}
