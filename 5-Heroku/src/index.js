import * as constants from './modules/constants'
import * as serverAPI from './modules/serverAPI'
import * as docUtil from './modules/documentHelpers'
import { classes } from './jss/jss'
import { v4 as uuidv4 } from 'uuid';
let editedID = 0;
let editMode = false;


const deleteButtonClick = (event) => {
    if (editMode) {
        alert('cant delete while in edit mode')
        return
    }
    const itemID = event.target.id.replace('itemDelete', '').toString()
    serverAPI.remove(itemID)
        .then(() => {
            const itemElement = document.getElementById(itemID)
            const listElement = document.getElementById(constants.todoListID)
            listElement.removeChild(itemElement)
        })
        .catch(err => alert(`item deletion is denied, ${err}`))
}
const editButtonClick = (event) => {
    editedID = event.target.id.replace('itemEdit', '').toString()
    editMode = true
    document.getElementById(constants.cancelButtonID).hidden = false
    docUtil.setInnerText(constants.applyButtonID, 'Apply')
    const title = docUtil.getInnerText(`title${editedID}`)
    const content = docUtil.getInnerText(`content${editedID}`)
    docUtil.setValue(constants.titleInputID, title)
    docUtil.setValue(constants.contentInputID, content)
}
const itemCheckboxClick = (event) => {
    const itemID = event.target.id.replace('itemCheckbox', '').toString()
    const titleElement = document.getElementById(`title${itemID}`)
    const contentElement = document.getElementById(`content${itemID}`)
    const editButtonElement = document.getElementById(`itemEdit${itemID}`)
    const action = !event.target.checked ? 'remove' : 'add'
    titleElement.classList[action](classes.strike)
    contentElement.classList[action](classes.invisible)
    editButtonElement.classList[action](classes.invisible)
}
function addItem() {
    const title = docUtil.getValue(constants.titleInputID)
    if (title === '') return
    if (editMode) {
        alert('cant add an item while in edit mode')
        return
    }
    const content = docUtil.getValue(constants.contentInputID)
    const list = document.getElementById(constants.todoListID)
    const _id = uuidv4()
    serverAPI.set(_id, title, content)
        .then(newItem => {
            if (!newItem) {
                alert('failed to create item')
                return
            }
            const itemElement = createTodoItemElement(newItem._id, title, content)
            list.appendChild(itemElement)
            clearMenu()
            docUtil.setInnerText(constants.applyButtonID, 'Add')
        })
        .catch(err => alert(`item update is denied, ${err}`))

}

function deleteCheckedItems() {
    if (editMode) {
        alert('cant delete while in edit mode')
        return
    }
    serverAPI.getAll()
        .then(itemList => {
            const list = document.getElementById(constants.todoListID)
            itemList.forEach(async (item) => {
                const checkbox = document.getElementById(`itemCheckbox${item._id}`)
                if (checkbox.checked) {
                    const itemElement = document.getElementById(`${item._id}`)
                    serverAPI.remove(item._id)
                        .then((result) => list.removeChild(itemElement))
                        .catch(err => alert(`item deletion is denied, ${err}`))
                }
            })
        })
        .catch((err) => alert(`Can\'t get items, Please try refreshing the page, ${err}`))
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
        serverAPI.set(editedID, title, content)
            .then(item => {
                if (!item) return
                clearMenu()
                editMode = false
                docUtil.setInnerText(constants.applyButtonID, 'Add')
                document.getElementById(constants.cancelButtonID).hidden = true
                editedID = 0
            }).catch((err) => alert(`item update is denied, ${err}`))
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
    itemCheckboxElement.addEventListener('click', itemCheckboxClick)
    return itemCheckboxElement
}
function createItemButtonsElement(itemID) {

    const itemButtonsElement = document.createElement('div')
    itemButtonsElement.classList.add(classes.todoItemButtons)

    const editButtonElement = document.createElement('button')
    editButtonElement.id = `itemEdit${itemID}`
    editButtonElement.innerText = 'edit'
    editButtonElement.classList.add(classes.itemEditButton)
    editButtonElement.addEventListener('click', editButtonClick)

    const deleteButtonElement = document.createElement('button')
    deleteButtonElement.id = `itemDelete${itemID}`
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.classList.add(classes.itemDeleteButton)
    deleteButtonElement.addEventListener('click', deleteButtonClick)

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
function showItemsFromDB() {
    serverAPI.getAll()
        .then(itemList => {
            const list = document.getElementById(constants.todoListID)
            itemList.forEach((item) => {
                const itemElement = createTodoItemElement(item._id, item.title, item.content)
                list.appendChild(itemElement)
            })
        }).catch(err => alert('unable to get items,' + err))
}
window.onload = function () {

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
