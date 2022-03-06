import * as constants from './modules/constants'
import * as serverAPI from './modules/todos'
import * as docUtil from './modules/documentHelpers'
import { classes } from './jss/jss'
let editedID = '0';
let editMode = false;


const deleteButtonClick = async (event: MouseEvent) => {
    if (editMode) {
        alert('cant delete while in edit mode')
        return
    }
    const itemID: string = (event.target as any).id.replace('itemDelete', '').toString()
    const itemElement = document.getElementById(itemID) as HTMLElement
    const listElement = document.getElementById(constants.todoListID) as HTMLElement

    serverAPI.remove(itemID)
        .then(() => listElement!.removeChild(itemElement))
        .catch((error) => alert(`item deletion is denied, ${error}`))
}
const editButtonClick = (event: Event) => {
    editedID = (event.target as any).id.replace('itemEdit', '').toString()
    editMode = true

    document.getElementById(constants.cancelButtonID)!.hidden = false
    docUtil.setInnerText(constants.applyButtonID, 'Apply')
    const title: string = docUtil.getInnerText(`title${editedID}`)
    const content: string = docUtil.getInnerText(`content${editedID}`)
    docUtil.setValue(constants.titleInputID, title)
    docUtil.setValue(constants.contentInputID, content)
}
const itemCheckboxClick = (event: Event) => {
    const itemID = (event.target as any).id.replace('itemCheckbox', '').toString()
    const titleElement = document.getElementById(`title${itemID}`)
    const contentElement = document.getElementById(`content${itemID}`)
    const editButtonElement = document.getElementById(`itemEdit${itemID}`)
    const action = !(event.target as any).checked ? 'remove' : 'add'
    titleElement!.classList[action](classes.strike)
    contentElement!.classList[action](classes.invisible)
    editButtonElement!.classList[action](classes.invisible)
}
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

    const content: string = docUtil.getValue(constants.contentInputID)
    const list: HTMLElement = document.getElementById(constants.todoListID) as HTMLElement
    serverAPI.set('none', title, content).then((item: any) => {
        if (!item) {
            alert('failed to create item')
            return
        }
        const itemElement = createTodoItemElement(item._id, item.title, item.content)
        list.appendChild(itemElement)

        clearMenu()
        docUtil.setInnerText(constants.applyButtonID, 'Add')

    })
}
function deleteCheckedItems() {
    if (editMode) {
        alert('cant delete while in edit mode')
        return
    }
    const list: HTMLElement = document.getElementById(constants.todoListID) as HTMLElement
    serverAPI.getAll().then((itemList: any) => {
        itemList.forEach((item: any) => {
            const checkbox: HTMLInputElement = document.getElementById(`itemCheckbox${item._id}`) as HTMLInputElement
            if (checkbox.checked) {
                const itemElement: HTMLElement = document.getElementById(`${item._id}`) as HTMLElement
                list.removeChild(itemElement)
                serverAPI.remove(item._id)
            }
        })
    })
}
function cancelEdit() {
    clearMenu()
    editMode = false
    docUtil.setInnerText(constants.applyButtonID, 'Add')
    document.getElementById(constants.cancelButtonID)!.hidden = true
    editedID = '0'
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
        clearMenu()
        editMode = false
        docUtil.setInnerText(constants.applyButtonID, 'Add')
        document.getElementById(constants.cancelButtonID)!.hidden = true
        editedID = '0'
    }
}
function addButton() {
    clearMenu()
    document.getElementById(constants.titleInputID)!.focus()
}

function createTodoItemElement(itemID: string, title: string, content: string) {

    const itemElement = document.createElement('ol')
    itemElement.classList.add(classes.todoItem)
    itemElement.id = itemID;

    const itemCheckboxElement = createItemCheckboxElement(itemID)
    const itemTextElement = createItemTextElement(itemID, title, content)
    const itemButtonsElement = createItemButtonsElement(itemID)

    itemElement.append(itemCheckboxElement, itemTextElement, itemButtonsElement)

    return itemElement
}
function createItemCheckboxElement(itemID: string) {
    const itemCheckboxElement = document.createElement('input')
    itemCheckboxElement.type = 'checkbox'
    itemCheckboxElement.classList.add(classes.itemCheckbox)
    itemCheckboxElement.id = `itemCheckbox${itemID}`
    itemCheckboxElement.addEventListener('click', itemCheckboxClick)
    return itemCheckboxElement
}
function createItemButtonsElement(itemID: string) {

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
function createItemTextElement(itemID: string, title: string, content: string) {

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
    const list: HTMLElement = document.getElementById(constants.todoListID) as HTMLElement
    serverAPI.getAll().then(itemList => {
        itemList.forEach((item: any) => {
            const itemElement = createTodoItemElement(item._id, item.title, item.content)
            list.appendChild(itemElement)
        })
    })
}
window.onload = async function () {

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
