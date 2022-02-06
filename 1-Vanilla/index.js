var edited_id = 0;
var edit_mode = false;
var id = 1;

function add_item(){
    let title = document.getElementById('title-input').value
    if (title ==''){
        console.log('cant add an item without a title')
        return
    }
    if (edit_mode){
        console.log('cant add an item while in edit mode')
        return
    }
    let subtitle = document.getElementById('subtitle-input').value
    let description = document.getElementById('description-input').value
    let list = document.getElementById('list')

    let itemElement = create_todo_item_element(id,title,subtitle,description)


    // finally append item to the list
    list.appendChild(itemElement)

    // now save to local storage
    let itemObject = `title: ${title};subtitle: ${subtitle};description: ${description}`
    localStorage.setItem(id,itemObject)

    // reset menu display
    document.getElementById('title-input').value = ''
    document.getElementById('subtitle-input').value = ''
    document.getElementById('description-input').value = ''
    document.getElementById('menu-button').innerText = 'add item'
    
    // dont forget to change the id variable
    id++
    localStorage.setItem('next_id',id)
}

function edit_item(item_id){
    edited_id = item_id
    document.getElementById('title-input').value = document.getElementById(`title${item_id}`).innerText
    document.getElementById('subtitle-input').value = document.getElementById(`subtitle${item_id}`).innerText
    document.getElementById('description-input').value = document.getElementById(`description${item_id}`).innerText
    edit_mode = true //to disable item deletion
    document.getElementById('cancel-button').hidden = false // to exit edit mode
    document.getElementById('menu-button').innerText = 'add changes' // to save changes and exit edit mode
}

function delete_item(item_id){
    if(edit_mode){
        console.log('cant delete while in edit mode')
        return
    }
    let item = document.getElementById(item_id)
    let list = document.getElementById('list')
    // remove from display
    list.removeChild(item)
    // remove from item storage
    localStorage.removeItem(item_id)
}

function cancel_edit(){
    document.getElementById('title-input').value = ''
    document.getElementById('subtitle-input').value = ''
    document.getElementById('description-input').value = ''
    edit_mode = false
    document.getElementById('menu-button').innerText = 'add item'
    document.getElementById('cancel-button').hidden = true
    edited_id = 0  
}

function clear_menu(){
    document.getElementById('title-input').value = ''
    document.getElementById('subtitle-input').value = ''
    document.getElementById('description-input').value = ''
}

function menu_button(){
    if(!edit_mode){
        add_item()
    }else{
        if (document.getElementById('title-input').value == ''){
            console.log('cant set an empty title')
            return
        }
        let title = document.getElementById('title-input').value
        let subtitle = document.getElementById('subtitle-input').value
        let description = document.getElementById('description-input').value
        document.getElementById(`title${edited_id}`).innerText = title
        document.getElementById(`subtitle${edited_id}`).innerText  = subtitle
        document.getElementById(`description${edited_id}`).innerText  = description
        // now update item in local storage
        let itemObject = `title: ${title};subtitle: ${subtitle};description: ${description}`
        localStorage.setItem(edited_id,itemObject)

        document.getElementById('title-input').value = ''
        document.getElementById('subtitle-input').value = ''
        document.getElementById('description-input').value = ''
        edit_mode = false
        document.getElementById('menu-button').innerText = 'add item'
        document.getElementById('cancel-button').hidden = true
        edited_id = 0
    }
}
function add_button(caller){
    document.getElementById('title-input').value = ''
    document.getElementById('subtitle-input').value = ''
    document.getElementById('description-input').value = ''
    document.getElementById('title-input').focus()
}
function create_todo_item_element(item_id,title,subtitle,description){

    // ol todo-item
    let itemElement = document.createElement('ol')
    itemElement.className = 'todo-item'
    itemElement.id = item_id;
        // input checkbox
        let itemCheckboxElement = document.createElement('input')
        itemCheckboxElement.type = 'checkbox'
        itemCheckboxElement.className = 'item-checkbox'
        // div todo-item-text
        let itemTextElement = document.createElement('div')
        itemTextElement.className = 'todo-item-text'
            // item title
            let titleElement = document.createElement('div')
            titleElement.innerText = title
            titleElement.className = 'todo-item-title'
            titleElement.id = 'title'+item_id
            // item subtitle
            let subtitleElement = document.createElement('div')
            subtitleElement.innerText = subtitle
            subtitleElement.className = 'todo-item-subtitle'
            subtitleElement.id = 'subtitle'+item_id
            // item description
            let descriptionElement = document.createElement('div')
            descriptionElement.innerText = description
            descriptionElement.className = 'todo-item-description'
            descriptionElement.id = 'description'+item_id
            // div todo-item-buttons
        let itemButtonsElement = document.createElement('div')
        itemButtonsElement.className = 'todo-item-buttons'
            // button edit
            let editButtonElement = document.createElement('button')
            editButtonElement.innerText = 'edit'
            editButtonElement.className = 'item-edit-button'
            editButtonElement.setAttribute('onclick',`edit_item(${item_id})`)
            // button delete
            let deleteButtonElement = document.createElement('button')
            deleteButtonElement.innerText = 'delete'
            deleteButtonElement.className = 'item-delete-button'
            deleteButtonElement.setAttribute('onclick',`delete_item(${item_id})`)

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

    // the itemElement should look like this example:

    // <ol id='item1' class='todo-item'>
    //    <input class='item-checkbox' type='checkbox'/>
    //    <div class='todo-item-text'>
    //        <div class='todo-item-title' id='title1'>Go for a walk with the dog</div>
    //        <div class='todo-item-subtitle' id='subtitle1'>very fun</div>
    //        <div class='todo-item-description' id='description1'>walk around the block 3 times, bring a doggy bag</div>
    //    </div>
    //    <div class='todo-item-buttons'>
    //        <button class='item-edit-button' onclick='edit_item(1)'>edit</button>
    //        <button class='item-delete-button' onclick='delete_item(1)'>delete</button>
    //    </div> 
    // </ol>

    return itemElement
}
// attach functions to menu buttons
window.onload = function(){
    document.getElementById('clear-button').setAttribute('onclick','clear_menu()')
    document.getElementById('menu-button').setAttribute('onclick','menu_button()')
    document.getElementById('cancel-button').setAttribute('onclick','cancel_edit()')
    // load display todo items from local storage
    let list = document.getElementById('list')
    if (localStorage.getItem('next_id')==null){
        id = 1
        localStorage.setItem('next_id',1)
    }
    for (let key in localStorage) {
        if(isNaN(Number(key)))
            continue;
        let item_string = localStorage.getItem(key)
        item_string = item_string.split(';')
        let title = item_string[0].split(':')[1]
        let subtitle = item_string[1].split(':')[1]
        let description = item_string[2].split(':')[1]
        let item_element = create_todo_item_element(Number(key),title,subtitle,description)
        list.appendChild(item_element)
        //make sure we get the right id in store for use
        if(Number(localStorage.getItem('next_id')) <= Number(key)){
            localStorage.setItem('next_id',Number(key)+1)
            id = Number(key)+1
        }
    }
}