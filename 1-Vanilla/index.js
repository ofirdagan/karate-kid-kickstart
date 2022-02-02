var editedItem = 'empty';
var editMode = false;

function addItem(){
    let title = document.getElementById('title-input').value
    if (title ==''){
        console.log('cant add an item without a title')
        return
    }
    if (editMode){
        console.log('cant add an item while in edit mode')
        return
    }
    let subtitle = document.getElementById('subtitle-input').value
    let description = document.getElementById('description-input').value
    let list = document.getElementById('list')
    // ol todo-item
    let itemElement = document.createElement('ol')
    itemElement.className = 'todo-item'
        
        // input checkbox
        let itemCheckboxElement = document.createElement('input')
        itemCheckboxElement.type = 'checkbox'
        itemCheckboxElement.className = 'item-checkbox'
        // div todo-item-text
        let itemTextElement = document.createElement('div')
        itemTextElement.className = 'todo-item-text'
            // item title
            let titleElement = document.createElement('div')
            titleElement.className = 'todo-item-title'
            titleElement.innerText = title
            // item subtitle
            let subtitleElement = document.createElement('div')
            subtitleElement.innerText = subtitle
            subtitleElement.className = 'todo-item-subtitle'
            // item description
            let descriptionElement = document.createElement('div')
            descriptionElement.innerText = description
            descriptionElement.className = 'todo-item-description'
        
            // div todo-item-buttons
        let itemButtonsElement = document.createElement('div')
        itemButtonsElement.className = 'todo-item-buttons'
            // button edit
            let editButtonElement = document.createElement('button')
            editButtonElement.innerText = 'edit'
            editButtonElement.className = 'item-edit-button'
            editButtonElement.setAttribute('onclick','goToEdit(this)')
            // button edit
            let deleteButtonElement = document.createElement('button')
            deleteButtonElement.innerText = 'delete'
            deleteButtonElement.className = 'item-delete-button'
            deleteButtonElement.setAttribute('onclick','delete_item(this)')

    // append the text to parent
    itemTextElement.appendChild(titleElement)
    itemTextElement.appendChild(subtitleElement)
    itemTextElement.appendChild(descriptionElement)
    // append the buttons to parent
    itemButtonsElement.appendChild(editButtonElement)
    itemButtonsElement.appendChild(deleteButtonElement)
    //append checkbox, text and buttons to list-item
    itemElement.appendChild(itemCheckboxElement)
    itemElement.appendChild(itemTextElement)
    itemElement.appendChild(itemButtonsElement)

    // the itemElement should look like this
    // <ol class='todo-item'>
    //    <input class='item-checkbox' type='checkbox'/>
    //    <div class='todo-item-text'>
    //        <div class='todo-item-title'>Go for a walk with the dog</div>
    //        <div class='todo-item-subtitle'>very fun</div>
    //        <div class='todo-item-description'>walk around the block 3 times, bring a doggy bag</div>
    //    </div>
    //    <div class='todo-item-buttons'>
    //        <button class='item-edit-button' onclick='goToEdit(this)'>edit</button>
    //        <button class='item-delete-button' onclick='delete_item(this)'>delete</button>
    //    </div> 
    // </ol>

    // finally append item to the list
    list.appendChild(itemElement)
    document.getElementById('title-input').value = ''
    document.getElementById('subtitle-input').value = ''
    document.getElementById('description-input').value = ''
    document.getElementById('menu-button').innerText = 'add item'
}
function goToEdit(caller){
    editedItem = caller.parentElement.parentElement.children[1]
    document.getElementById('title-input').value = editedItem.children[0].innerHTML
    document.getElementById('subtitle-input').value = editedItem.children[1].innerHTML
    document.getElementById('description-input').value = editedItem.children[2].innerHTML
    editMode = true
    document.getElementById('cancel-button').hidden = false
    document.getElementById('menu-button').innerText = 'add changes'
}
function delete_item(caller){
    if(editMode){
        console.log('cant delete while in edit mode')
        return
    }
    let item = caller.parentElement.parentElement
    console.log(item)
    let list = document.getElementById('list')
    list.removeChild(item)
}
function cancel_edit(){
    document.getElementById('title-input').value = ''
    document.getElementById('subtitle-input').value = ''
    document.getElementById('description-input').value = ''
    editMode = false
    document.getElementById('menu-button').innerText = 'add item'
    document.getElementById('cancel-button').hidden = true  
}
function clear_menu(){
    document.getElementById('title-input').value = ''
    document.getElementById('subtitle-input').value = ''
    document.getElementById('description-input').value = ''
}
function menu_button(caller){
    if(!editMode){
        addItem()
    }else{
        if (document.getElementById('title-input').value == ''){
            console.log('cant set an empty title')
            return
        }
        editedItem.children[0].innerHTML = document.getElementById('title-input').value
        editedItem.children[1].innerHTML = document.getElementById('subtitle-input').value
        editedItem.children[2].innerHTML = document.getElementById('description-input').value
        document.getElementById('title-input').value = ''
        document.getElementById('subtitle-input').value = ''
        document.getElementById('description-input').value = ''
        editMode = false
        document.getElementById('menu-button').innerText = 'add item'
        document.getElementById('cancel-button').hidden = true
    }
}
function add_button(caller){
    document.getElementById('title-input').value = ''
    document.getElementById('subtitle-input').value = ''
    document.getElementById('description-input').value = ''
    document.getElementById('title-input').focus()
}