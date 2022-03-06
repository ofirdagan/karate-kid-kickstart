import constants from './modules/constants'
import * as storage from './modules/todos'
import docUtil from './modules/documentHelpers'
import { classes } from './jss/jss'
let editedID = 0;
let editMode = false;

async function addItem() {
    const title = docUtil.getValue(constants.titleInputID)
    if (title === '') {
        alert('cant add an item without a title')
        return
    }
    if (editMode) {
        alert('cant add an item while in edit mode')
        return
    }

    const content = docUtil.getValue(constants.contentInputID)
    const list = document.getElementById(constants.todoListID)
    const item = await storage.set('none', title, content)
    if (!item) {
        alert('failed to create item')
        return
    }
    const itemElement = createTodoItemElement(item._id, item.title, item.content)
    list.appendChild(itemElement)

    clearMenu()
    docUtil.setInnerText(constants.applyButtonID, 'Add')
}
async function deleteCheckedItems() {
    if (editMode) {
        alert('cant delete while in edit mode')
        return
    }
    const itemList = await storage.getAll()
    const list = document.getElementById(constants.todoListID)
    for (const id in itemList) {
        const checkbox = document.getElementById(`itemCheckbox${id}`)
        if (checkbox.checked) {
            const itemElement = document.getElementById(`${id}`)
            list.removeChild(itemElement)
            storage.remove(id)
        }
    }
}
function cancelEdit() {
    clearMenu()
    editMode = false
    docUtil.setInnerText(constants.applyButtonID, 'Add')
    document.getElementById(constants.cancelButtonID).hidden = true
    editedID = 0
}

function clearMenu() {
    docUtil.setValue(constants.titleInputID, '')
    docUtil.setValue(constants.contentInputID, '')
}

function menuButtonClick() {
    if (!editMode) {
        addItem()
    } else {
        if (docUtil.getValue(constants.titleInputID) === '') {
            alert('cant set an empty title')
            return
        }
        const title = docUtil.getValue(constants.titleInputID)
        const content = docUtil.getValue(constants.contentInputID)
        docUtil.setInnerText(`title${editedID}`, title)
        docUtil.setInnerText(`content${editedID}`, content)
        storage.set(editedID, title, content)
        clearMenu()
        editMode = false
        docUtil.setInnerText(constants.applyButtonID, 'Add')
        document.getElementById(constants.cancelButtonID).hidden = true
        editedID = 0
    }
}
function addButton() {
    clearMenu()
    document.getElementById(constants.titleInputID).focus()
}

function createTodoItemElement(itemID, title, content) {

    const itemElement = document.createElement('ol')
    itemElement.classList.add(classes.todoItem)
    itemElement.id = itemID;

    const itemCheckboxElement = createItemCheckboxElement(itemID)
    const itemTextElement = createItemTextElement(itemID, title, content)
    const itemButtonsElement = createItemButtonsElement(itemID)

    itemElement.append(itemCheckboxElement, itemTextElement, itemButtonsElement)

    return itemElement
}
function createItemCheckboxElement(itemID) {
    const itemCheckboxElement = document.createElement('input')
    itemCheckboxElement.type = 'checkbox'
    itemCheckboxElement.classList.add(classes.itemCheckbox)
    itemCheckboxElement.id = `itemCheckbox${itemID}`
    itemCheckboxElement.onclick = function () {
        const titleElement = document.getElementById(`title${itemID}`)
        const contentElement = document.getElementById(`content${itemID}`)
        const editButtonElement = document.getElementById(`itemEdit${itemID}`)
        if (!this.checked) {
            titleElement.classList.remove(classes.strike)
            contentElement.classList.remove(classes.invisible)
            editButtonElement.classList.remove(classes.invisible)
        } else {
            titleElement.classList.add(classes.strike)
            contentElement.classList.add(classes.invisible)
            editButtonElement.classList.add(classes.invisible)
        }
    }
    return itemCheckboxElement
}
function createItemButtonsElement(itemID) {

    const itemButtonsElement = document.createElement('div')
    itemButtonsElement.classList.add(classes.todoItemButtons)

    const editButtonElement = document.createElement('button')
    editButtonElement.id = `itemEdit${itemID}`
    editButtonElement.innerText = 'edit'
    editButtonElement.classList.add(classes.itemEditButton)
    editButtonElement.onclick = function () {

        editMode = true
        editedID = itemID

        document.getElementById(constants.cancelButtonID).hidden = false
        docUtil.setInnerText(constants.applyButtonID, 'Apply')
        const title = docUtil.getInnerText(`title${itemID}`)
        const content = docUtil.getInnerText(`content${itemID}`)
        docUtil.setValue(constants.titleInputID, title)
        docUtil.setValue(constants.contentInputID, content)
    }

    const deleteButtonElement = document.createElement('button')
    deleteButtonElement.id = `itemDelete${itemID}`
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.classList.add(classes.itemDeleteButton)
    deleteButtonElement.onclick = function () {
        if (editMode) {
            alert('cant delete while in edit mode')
            return
        }
        const item = document.getElementById(itemID)
        const list = document.getElementById(constants.todoListID)

        list.removeChild(item)

        storage.remove(itemID)
    }

    itemButtonsElement.append(editButtonElement, deleteButtonElement)

    return itemButtonsElement
}
function createItemTextElement(itemID, title, content) {

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

    itemTextElement.append(titleElement, contentElement)

    return itemTextElement
}
async function showItemsFromDB() {
    const list = document.getElementById(constants.todoListID)
    storage.getAll().then(itemList => {
        itemList.forEach(item => {
            const itemElement = createTodoItemElement(item._id, item.title, item.content)
            list.appendChild(itemElement)
        })
    })
}
window.onload = async function () {

    document.body.addEventListener('keyup', function (event) {
        if (event.keyCode === constants.escapeKeycode) {
            document.getElementById(constants.cancelButtonID).click()
            document.getElementById(constants.titleInputID).focus()
        }
    })
    docUtil.addEvent(constants.menuID, 'keyup', function (event) {
        if (event.keyCode === constants.enterKeycode) {
            document.getElementById(constants.applyButtonID).click()
            document.getElementById(constants.titleInputID).focus()
        }
    })
    docUtil.addEvent(constants.clearButtonID, 'click', clearMenu)
    docUtil.addEvent(constants.applyButtonID, 'click', menuButtonClick)
    docUtil.addEvent(constants.cancelButtonID, 'click', cancelEdit)
    docUtil.addEvent(constants.addButtonID, 'click', addButton)
    docUtil.addEvent(constants.cleanButtonID, 'click', deleteCheckedItems)

    showItemsFromDB()
}
