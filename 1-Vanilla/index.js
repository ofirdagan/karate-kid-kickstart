(function() {
    let editedID = 0;
    let editMode = false;
    function getNewID(){
        return Math.floor(Math.random()*1000)
    }
    function addItem(){
        let title = getValue('title-input')
        if (title ==''){
            alert('cant add an item without a title')
            return
        }
        if (editMode){
            alert('cant add an item while in edit mode')
            return
        }
        let content = getValue('content-input')
        let list = document.getElementById('list')
        let id = getNewID()
        let itemElement = createTodoItemElement(id,title,content)
    
        list.appendChild(itemElement)
        let itemString = `title: ${title};content: ${content}`
        localStorage.setItem(id,itemString)
    
        clearMenu()
        setInnerText('menu-button','Add item')
    }
    
    function sendItemToEdit(itemID){
        
        editedID = itemID
        let title = getInnerText(`title${itemID}`)
        let content = getInnerText(`content${itemID}`)
        setValue('title-input',title)
        setValue('content-input',content)
        
        editMode = true
        document.getElementById('cancel-button').hidden = false
        setInnerText('menu-button','Add changes')
    }
    
    function deleteItem(itemID){
        if(editMode){
            alert('cant delete while in edit mode')
            return
        }
        let item = document.getElementById(itemID)
        let list = document.getElementById('list')
        list.removeChild(item)
        localStorage.removeItem(itemID)
    }
    
    function cancelEdit(){
        clearMenu()
        editMode = false
        setInnerText('menu-button','Add item')
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
            let title = getValue('title-input')
            let content = getValue('content-input')
            setInnerText(`title${editedID}`,title)
            setInnerText(`content${editedID}`,content)
            let itemObject = `title: ${title};content: ${content}`
            localStorage.setItem(editedID,itemObject)
    
            clearMenu()
            editMode = false
            setInnerText('menu-button','Add item')
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
    
        let itemElement = document.createElement('ol')
        itemElement.className = 'todo-item'
        itemElement.id = itemID;
        let itemCheckboxElement = document.createElement('input')
        itemCheckboxElement.type = 'checkbox'
        itemCheckboxElement.className = 'itemCheckbox'
        let itemTextElement = createItemTextElement(itemID,title,content)
        let itemButtonsElement = createItemButtonsElement(itemID)
        itemElement.appendChild(itemCheckboxElement)
        itemElement.appendChild(itemTextElement)
        itemElement.appendChild(itemButtonsElement)
    
        return itemElement
    }
    function createItemButtonsElement(itemID){
    
        let itemButtonsElement = document.createElement('div')
        itemButtonsElement.className = 'todo-item-buttons'
        let editButtonElement = document.createElement('button')
        editButtonElement.innerText = 'edit'
        editButtonElement.className = 'itemEditButton'
        editButtonElement.setAttribute('onclick',`sendItemToEdit(${itemID})`)
        let deleteButtonElement = document.createElement('button')
        deleteButtonElement.innerText = 'delete'
        deleteButtonElement.className = 'itemDeleteButton'
        deleteButtonElement.setAttribute('onclick',`deleteItem(${itemID})`)

        itemButtonsElement.appendChild(editButtonElement)
        itemButtonsElement.appendChild(deleteButtonElement)
    
        return itemButtonsElement
    }
    function createItemTextElement(itemID,title,content){
    
        let itemTextElement = document.createElement('div')
        itemTextElement.className = 'todoItemText'
        let titleElement = document.createElement('div')
        titleElement.innerText = title
        titleElement.className = 'todoItemTitle'
        titleElement.id = 'title'+itemID
        let contentElement = document.createElement('div')
        contentElement.innerText = content
        contentElement.className = 'todoItemContent'
        contentElement.id = 'content'+itemID
        itemTextElement.appendChild(titleElement)
        itemTextElement.appendChild(contentElement)
    
        return itemTextElement
    }

    window.onload = function(){

        document.getElementById('clear-button').onclick = clearMenu
        document.getElementById('menu-button').onclick = menuButtonClick
        document.getElementById('cancel-button').onclick = cancelEdit
        document.getElementById('add-button').onclick = addButton
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

})();
