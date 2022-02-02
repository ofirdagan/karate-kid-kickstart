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
    console.log(title,subtitle,description)
    let list = document.getElementById('list')
    // list.parentElement
    let item = document.createElement('ol')
    item.className = 'todo-item'
    item.innerHTML = `    <input class='item-checkbox' type='checkbox'/>
    <div class='todo-item-text'>
        <div class='todo-item-title'>${title}</div>
        <div class='todo-item-subtitle'>${subtitle}</div>
        <div class='todo-item-description'>${description}</div>
    </div>
    <div class='todo-item-buttons'>
        <button class='item-edit-button' onclick='goToEdit(this)'>edit</button>
        <button class='item-delete-button' onclick='delete_item(this)'>delete</button>
    </div>`
    list.appendChild(item)
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