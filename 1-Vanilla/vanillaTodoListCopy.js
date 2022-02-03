
(function () {

const createCheck = (todoId) => {
    let checkDiv = document.createElement('input');
    checkDiv.type = 'checkbox'
    const checkDivClassName = "checked"
    checkDiv.classList.add(checkDivClassName)
    checkDiv.onclick = function(){handleCheckedClick(todoId)}
    return checkDiv
}

const createButton = (type, todoId) => {
    let button = document.createElement('button');
    const buttonClassName = `${type}-button`
    button.classList.add(buttonClassName)
    button.appendChild(createIcon(type, todoId))
    button.onclick = function(){handleButtonClick(type, todoId)}
    return button
} 
const createIcon = (type, id)  => {
    debugger;
    let icon = document.createElement('i');
    let iconClassName = ""
    let iconId = ``
    debugger
    switch(type) {
        case 'delete':
            iconClassName = "fas fa-trash";
            iconId = `icon-delete-${id}`
            break;
        case 'edit':
            iconClassName = "fas fa-edit";
            iconId = `icon-edit-${id}`
            break;
        case 'check':
            iconClassName = "fa-check";
            iconId = `icon-check-${id}`
        default:
            // none
    }
    icon.innerHTML = `<i class="${iconClassName}" id="${iconId}"></i>`
    return icon
}


function handleButtonClick(type, todoId) {
    debugger
    if (type === 'delete'){
        handleDeleteTodo(todoId)
    }else if ('edit'){
        handleEditTodo(todoId)
    }else {
        console.log('text');
    }
}   

function handleCheckedClick(todoId) {
    debugger
    const todo = document.getElementById(`todo-item-${todoId}`)
    todo.classList.toggle('completed')
}

function handleSubmitTodo(e) {
    e.preventDefault();

    let input = document.getElementById('new-task-input');
    if (input.value.trim() != '') {
        // add the todo
        addTodo(input.value)
    }else {
        alert("You didnt enter any Todo")
    }
    // reset the input text
    input.value = '';
}

function handleDeleteTodo(todoId) {
    // loop over all
    debugger;
    let li = document.getElementById(`todo-list-item-${todoId}`)
    li.remove()
}

function handleEditTodo(todoId){
    let li = document.getElementById(`todo-list-item-${todoId}`)
    debugger;
    let todoItem = document.getElementById(`todo-item-${todoId}`)
    if (todoItem.disabled) {
        todoItem.disabled = false
    } else {
        let todoItem = document.getElementById(`todo-item-${todoId}`)
        todoItem.disabled = true
    }
}


function addTodo(todoText) {
    // here we need to add a ul
    const todoId = todoList.length
    todoList.push(todoId)


    let ul = document.getElementById('todo-list')
    let li = document.createElement('li')
    let todoDiv = document.createElement('input');
    todoDiv.classList.add('todo-item');
    todoDiv.disabled = true
    todoDiv.id = (`todo-item-${todoId}`)
    todoDiv.value = todoText
    const deleteButton = createButton('delete', todoId)
    const editButton = createButton('edit', todoId)
    const checked = createCheck(todoId);

    // add content to li
    li.appendChild(checked)
    li.appendChild(todoDiv)
    li.appendChild(deleteButton)
    li.appendChild(editButton)
    li.classList.add('todo-list-item')
    li.id = (`todo-list-item-${todoId}`)
    ul.appendChild(li)
}
    
    const todoList = []
    document.getElementById('todo-button').addEventListener('click', handleSubmitTodo);
  })();