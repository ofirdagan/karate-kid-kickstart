import * as constants from './modules/constants'
import * as serverAPI from './modules/serveAPI'
import * as docUtil from './modules/documentUtilities'
import Item from '../common/interfaces/Item'
import Guid from '../common/types/Guid'
import classes from './jss/jss'
import { v4 as uuid } from 'uuid'

let editedID: Guid = '';


const deleteButtonClick = async (event: MouseEvent): Promise<void> => {
    if (editedID) return alert('cant delete while in edit mode')
    const itemID: Guid = (event.target as HTMLElement).id.replace('itemDelete', '')
    const itemElement: HTMLElement = document.getElementById(itemID) as HTMLElement
    const listElement: HTMLElement = document.getElementById(constants.todoListID) as HTMLElement
    serverAPI.remove(itemID)
        .then(() => listElement!.removeChild(itemElement))
        .catch((error) => alert(`item deletion is denied, ${error}`))
}
const editButtonClick = (event: Event): void => {
    editedID = (event.target as HTMLElement).id.replace('itemEdit', '')
    document.getElementById(constants.cancelButtonID)!.hidden = false
    docUtil.setInnerText(constants.applyButtonID, 'Apply')
    const title: string = docUtil.getInnerText(`title${editedID}`)
    const content: string = docUtil.getInnerText(`content${editedID}`)
    docUtil.setValue(constants.titleInputID, title)
    docUtil.setValue(constants.contentInputID, content)
}
const itemCheckboxClick = (event: Event): void => {
    const itemID: Guid = (event.target as HTMLInputElement).id.replace('itemCheckbox', '')
    const titleElement: HTMLElement = document.getElementById(`title${itemID}`) as HTMLElement
    const contentElement: HTMLElement = document.getElementById(`content${itemID}`) as HTMLElement
    const editButtonElement: HTMLElement = document.getElementById(`itemEdit${itemID}`) as HTMLElement
    const action = !(event.target as HTMLInputElement).checked ? 'remove' : 'add'
    titleElement.classList[action](classes.strike)
    contentElement.classList[action](classes.invisible)
    editButtonElement.classList[action](classes.invisible)
}
async function addItem(): Promise<void> {
    const title: string = docUtil.getValue(constants.titleInputID)
    if (!title) return alert('cant add an item without a title')
    if (editedID) return alert('cant add an item while in edit mode')
    const content: string = docUtil.getValue(constants.contentInputID)
    const itemElementList: HTMLElement = document.getElementById(constants.todoListID) as HTMLElement
    const newItemID: Guid = uuid()
    serverAPI.set(newItemID, title, content).then((item: Item) => {
        if (!item._id) return alert('failed to create item')
        const newItemElement: HTMLElement = createTodoItemElement(item._id, item.title, item.content) as HTMLElement
        itemElementList.append(newItemElement)
        clearMenu()
        docUtil.setInnerText(constants.applyButtonID, 'Add')
    }).catch((err: Error) => alert(`failed to create item, ${err}`))
}
function deleteCheckedItems(): void {
    if (editedID) return alert('cant delete while in edit mode')
    const itemElementList: HTMLElement = document.getElementById(constants.todoListID) as HTMLElement
    serverAPI.getAll().then((itemList: Item[]) => {
        itemList.forEach((item: Item) => {
            const checkbox: HTMLInputElement = document.getElementById(`itemCheckbox${item._id}`) as HTMLInputElement
            if (checkbox.checked) {
                serverAPI.remove(item._id).then((deletedItem: Item) => {
                    const deletedItemElement: HTMLElement = document.getElementById(`${item._id}`) as HTMLElement
                    itemElementList.removeChild(deletedItemElement)
                }).catch((err: Error) => alert(`could not remove item ${item._id}, ${err}`))
            }
        })
    }).catch((err: Error) => alert(`could not remove all checked items, ${err}`))
}
function cancelEdit(): void {
    clearMenu()
    docUtil.setInnerText(constants.applyButtonID, 'Add')
    document.getElementById(constants.cancelButtonID)!.hidden = true
    editedID = ''
}

function clearMenu(): void {
    docUtil.setValue(constants.titleInputID, '')
    docUtil.setValue(constants.contentInputID, '')
}

async function menuButtonClick(): Promise<void> {
    if (!editedID) return addItem()
    const title: string = docUtil.getValue(constants.titleInputID)
    if (!title) return alert('cant set an empty title')
    const content: string = docUtil.getValue(constants.contentInputID)
    docUtil.setInnerText(`title${editedID}`, title)
    docUtil.setInnerText(`content${editedID}`, content)
    serverAPI.set(editedID, title, content).then((item: Item) => {
        clearMenu()
        docUtil.setInnerText(constants.applyButtonID, 'Add')
        document.getElementById(constants.cancelButtonID)!.hidden = true
        editedID = ''
    }).catch((err: Error) => alert(`falied to set changes, ${err}`))
}
function addButton(): void {
    clearMenu()
    document.getElementById(constants.titleInputID)!.focus()
}

function createTodoItemElement(itemID: Guid, title: string, content: string): HTMLElement {

    const itemElement: HTMLElement = document.createElement('ol')
    itemElement.classList.add(classes.todoItem)
    itemElement.id = itemID;

    const itemCheckboxElement: HTMLElement = createItemCheckboxElement(itemID)
    const itemTextElement: HTMLElement = createItemTextElement(itemID, title, content)
    const itemButtonsElement: HTMLElement = createItemButtonsElement(itemID)

    itemElement.append(itemCheckboxElement, itemTextElement, itemButtonsElement)

    return itemElement
}
function createItemCheckboxElement(itemID: Guid): HTMLElement {
    const itemCheckboxElement: HTMLInputElement = document.createElement('input')
    itemCheckboxElement.type = 'checkbox'
    itemCheckboxElement.classList.add(classes.itemCheckbox)
    itemCheckboxElement.id = `itemCheckbox${itemID}`
    itemCheckboxElement.addEventListener('click', itemCheckboxClick)
    return itemCheckboxElement
}
function createItemButtonsElement(itemID: Guid): HTMLElement {

    const itemButtonsElement: HTMLElement = document.createElement('div')
    itemButtonsElement.classList.add(classes.todoItemButtons)

    const editButtonElement: HTMLElement = document.createElement('button')
    editButtonElement.id = `itemEdit${itemID}`
    editButtonElement.innerText = 'edit'
    editButtonElement.classList.add(classes.itemEditButton)
    editButtonElement.addEventListener('click', editButtonClick)

    const deleteButtonElement: HTMLElement = document.createElement('button')
    deleteButtonElement.id = `itemDelete${itemID}`
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.classList.add(classes.itemDeleteButton)
    deleteButtonElement.addEventListener('click', deleteButtonClick)

    itemButtonsElement.append(editButtonElement, deleteButtonElement)

    return itemButtonsElement
}
function createItemTextElement(itemID: Guid, title: string, content: string): HTMLElement {

    const itemTextElement: HTMLElement = document.createElement('div')
    itemTextElement.classList.add(classes.todoItemText)

    const titleElement: HTMLElement = document.createElement('div')
    titleElement.innerText = title
    titleElement.classList.add(classes.todoItemTitle)
    titleElement.id = `title${itemID}`

    const contentElement: HTMLElement = document.createElement('div')
    contentElement.innerText = content
    contentElement.classList.add(classes.todoItemContent)
    contentElement.id = `content${itemID}`

    itemTextElement.append(titleElement, contentElement)

    return itemTextElement
}
async function showItemsFromDB(): Promise<void> {
    const list: HTMLElement = document.getElementById(constants.todoListID) as HTMLElement
    serverAPI.getAll().then((itemList: Item[]) => {
        itemList.forEach((item: Item) => {
            const itemElement: HTMLElement = createTodoItemElement(item._id, item.title, item.content)
            list.appendChild(itemElement)
        })
    }).catch((err: Error) => alert(`falied to load items, please try refreshing the page.\n ${err}`))
}
window.onload = async function (): Promise<void> {

    document.body.addEventListener('keyup', function (event: KeyboardEvent) {
        if (event.keyCode === constants.escapeKeycode) {
            document.getElementById(constants.cancelButtonID)!.click()
            document.getElementById(constants.titleInputID)!.focus()
        }
    })
    docUtil.addEvent(constants.menuID, 'keyup', function (event: KeyboardEvent) {
        if (event.keyCode === constants.enterKeycode) {
            document.getElementById(constants.applyButtonID)!.click()
            document.getElementById(constants.titleInputID)!.focus()
        }
    })
    docUtil.addEvent(constants.clearButtonID, 'click', clearMenu)
    docUtil.addEvent(constants.applyButtonID, 'click', menuButtonClick)
    docUtil.addEvent(constants.cancelButtonID, 'click', cancelEdit)
    docUtil.addEvent(constants.addButtonID, 'click', addButton)
    docUtil.addEvent(constants.cleanButtonID, 'click', deleteCheckedItems)

    showItemsFromDB()
}
