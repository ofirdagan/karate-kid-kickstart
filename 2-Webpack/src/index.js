const storage = require('./modules/storage.js')
const { getValue,
        setValue,
        getInnerText,
        setInnerText,
        addEvent} = require('./modules/helperFunctions.js')
const { titleInputID,
        addButtonID,
        contentInputID,
        applyButtonID,
        cancelButtonID,
        clearButtonID,
        cleanButtonID,
        todoListID,
        menuID,
        enterKeycode,
        escapeKeycode } = require('./modules/IDs.js')

let editedID = 0;
let editMode = false;

function getNewID(){
    return new Date().getTime().toString()
}

function addItem(){
    const title = getValue(titleInputID)
    if (title === ''){
        alert('cant add an item without a title')
        return
    }
    if (editMode){
        alert('cant add an item while in edit mode')
        return
    }
    const content = getValue(contentInputID)
    const list = document.getElementById(todoListID)
    const id = getNewID()
    storage.set(id, title,content)
    const itemElement = createTodoItemElement(id,title,content)
    list.appendChild(itemElement)

    clearMenu()
    setInnerText(applyButtonID,'Add')
}

function deleteCheckedItems(){
    const itemList = storage.getAll()
    const list = document.getElementById(todoListID)
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
    setInnerText(applyButtonID,'Add')
    document.getElementById(cancelButtonID).hidden = true
    editedID = 0  
}

function clearMenu(){
    setValue(titleInputID,'')
    setValue(contentInputID,'')
}

function menuButtonClick(){
    if(!editMode){
        addItem()
    }else{
        const title = getValue(titleInputID)
        if (title === ''){
            document.getElementById(titleInputID).setAttribute('required',true)
            alert('cant set an empty title')
            return
        }
        const content = getValue(contentInputID)
        setInnerText(`title${editedID}`,title)
        setInnerText(`content${editedID}`,content)
        storage.set(editedID, title, content)
        clearMenu()
        editMode = false
        setInnerText(applyButtonID,'Add')
        document.getElementById(cancelButtonID).hidden = true
        editedID = 0
    }
}

function addButton(){
    clearMenu()
    document.getElementById(titleInputID).focus()
}

function createTodoItemElement(itemID,title,content){

    const itemElement = document.createElement('ol')
    itemElement.className = 'todo-item'
    itemElement.id = itemID;

    const itemCheckboxElement = document.createElement('input')
    itemCheckboxElement.type = 'checkbox'
    itemCheckboxElement.className = 'itemCheckbox'
    itemCheckboxElement.id = `itemCheckbox${itemID}`

    const itemTextElement = createItemTextElement(itemID,title,content)
    const itemButtonsElement = createItemButtonsElement(itemID)

    itemElement.appendChild(itemCheckboxElement)
    itemElement.appendChild(itemTextElement)
    itemElement.appendChild(itemButtonsElement)

    return itemElement
}

function createItemButtonsElement(itemID){

    const itemButtonsElement = document.createElement('div')
    itemButtonsElement.className = 'todo-item-buttons'

    const editButtonElement = document.createElement('button')
    editButtonElement.id = `itemEdit${itemID}`
    editButtonElement.innerText = 'edit'
    editButtonElement.className = 'itemEditButton'
    editButtonElement.addEventListener('click',function(){
        editMode = true
        editedID = itemID
        document.getElementById(cancelButtonID).hidden = false
        setInnerText(applyButtonID,'Apply')
        const title = getInnerText(`title${itemID}`)
        const content = getInnerText(`content${itemID}`)
        setValue(titleInputID,title)
        setValue(contentInputID,content)
        document.getElementById(titleInputID).focus()
    })

    const deleteButtonElement = document.createElement('button')
    deleteButtonElement.id = `itemDelete${itemID}`
    deleteButtonElement.innerText = 'delete'
    deleteButtonElement.className = 'itemDeleteButton'
    deleteButtonElement.addEventListener('click',function(){
        if(editMode){
            alert('cant delete while in edit mode')
            return
        }
        const item = document.getElementById(itemID)
        const list = document.getElementById(todoListID)

        list.removeChild(item)

        storage.remove(itemID)
    })

    itemButtonsElement.appendChild(editButtonElement)
    itemButtonsElement.appendChild(deleteButtonElement)

    return itemButtonsElement
}

function createItemTextElement(itemID,title,content){

    const itemTextElement = document.createElement('div')
    itemTextElement.className = 'todoItemText'

    const titleElement = document.createElement('div')
    titleElement.innerText = title
    titleElement.className = 'todoItemTitle'
    titleElement.id = `title${itemID}`

    const contentElement = document.createElement('div')
    contentElement.innerText = content
    contentElement.className = 'todoItemContent'
    contentElement.id = `content${itemID}`

    itemTextElement.appendChild(titleElement)
    itemTextElement.appendChild(contentElement)

    return itemTextElement
}

function showItemsFromLocalStorage(){
    const todoMap = storage.getAll()
    const list = document.getElementById(todoListID)
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
        if (event.keyCode === escapeKeycode){
            document.getElementById(cancelButtonID).click()
            document.getElementById(titleInputID).focus()
        }
    })
    addEvent(menuID,'keyup',function(event) {
        if (event.keyCode === enterKeycode) {
            document.getElementById(applyButtonID).click()
            document.getElementById(titleInputID).focus()
        }
    })
    addEvent(clearButtonID,'click',clearMenu)
    addEvent(applyButtonID,'click',menuButtonClick)
    addEvent(cancelButtonID,'click',cancelEdit)
    addEvent(addButtonID,'click',addButton)
    addEvent(cleanButtonID,'click',deleteCheckedItems)
    
    showItemsFromLocalStorage()
}
