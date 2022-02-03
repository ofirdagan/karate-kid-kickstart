

document.getElementById('todo-button').addEventListener('click', handleSubmitTodo);
let index = 0

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

function handleDeleteTodo(index) {
    debugger;

    let itemToDelete = e;
}

function addTodo(todo) {
    // here we need to add a ul
    let ul = document.getElementById('todo-list')
    let li = document.createElement('li')
    // add content to li
    li.innerHTML = `
                <div class='todo-item' data-id=${index}>${todo}</div>
                <button class="delete-button" id="delete-button" onclick="handleDeleteTodo(${index})"'><i class="fas fa-trash"></i></button>
                `
    li.classList.add('todo-list-item')
    index += 1
    ul.appendChild(li)
}