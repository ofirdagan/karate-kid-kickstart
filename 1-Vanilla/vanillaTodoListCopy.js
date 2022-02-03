
(function () {
    // some initiation code


const createButton = (type, todoObj) => {
    debugger;
    let button = document.createElement('button');
    const buttonClassName = `${type}-button`
    button.classList.add(buttonClassName)
    button.appendChild(createIcon(type))
    // button.addEventListener('click', handleButtonClick)
    button.onclick = function(){handleButtonClick(type, todoObj.id)}
    return button
} 
const createIcon = (type)  => {
    debugger;
    let icon = document.createElement('i');
    let iconClassName = ""
    
    if (type === 'delete'){
        iconClassName = "fas fa-trash";
    }
    else if (type === 'edit') {
        iconClassName = "fas fa-edit";

    }else{ 
        console.log('text');;
    }
    icon.innerHTML = `<i class="${iconClassName}"></i>`
    return icon
}

const createToDo = () => {

}


function handleButtonClick(type, todoId) {
    // console.log(e.currentTarget.className);
    debugger
    if (type === 'delete'){
        handleDeleteTodo(todoId)
    }else if (type === 'edit-button'){
        handleEditTodo()
    }else {
        console.log('text');;

    }
}   


function handleSubmitTodo(e) {
    e.preventDefault();

    let input = document.getElementById('new-task-input');
    if (input.value != '') {
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
}


function addTodo(todoText) {
    // here we need to add a ul
    const todoId = todoList.length
    const todoObj = {
        text: todoText,
        id: todoId,
        edit: false
    }
    todoList.push(todoObj)
    console.log(todoList);


    let ul = document.getElementById('todo-list')
    let li = document.createElement('li')
    let todoDiv = document.createElement('div');
    todoDiv.classList.add('todo-item');
    todoDiv.innerHTML = todoText
    const deleteButton = createButton('delete', todoObj)
    const editButton = createButton('edit', todoObj)
    // add content to li
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