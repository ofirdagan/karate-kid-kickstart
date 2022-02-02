

document.querySelector('button').addEventListener('click', handleSubmitTodo)


function handleSubmitTodo(e) {
    e.preventDefault();

    let input = document.getElementById('new-task-input');
    if (input.value != '') {
        // add the todo
        addTodo(input.value)
    }
    // reset the input text
    input.value = '';
}

function addTodo(todo) {
    // here we need to add a ul
    let ul = document.getElementById('todo-list')
    let li = document.createElement('li')
    // add content to li
    li.innerHTML = `
                <div class='todo-item'>${todo}</div>
                <button class="delete-button"><i class="fas fa-trash"></i></button>
                `
    li.classList.add('todo-list-item')
    ul.appendChild(li)
}