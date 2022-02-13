import {
    loadTodoListFromLS,
    updateTodoInLS,
    removeTodoFromLocalStorage,
    saveTodoToLocalStorage,
    getTodoById} from './localStorage'

(function() {
    const createCheck = (todo) => {
        let checkDiv = document.createElement('input');
        checkDiv.type = 'checkbox'
        const checkDivClassName = "checked"
        checkDiv.checked = todo.checked
        checkDiv.id = 'checked'
        checkDiv.classList.add(checkDivClassName)
        checkDiv.addEventListener('click', function() {handleCheckedClick(todo.todoId)})
        return checkDiv
    }
    
    const createButton = (type, todoId) => {
        let button = document.createElement('button');
        const buttonClassName = `${type}-button`
        button.classList.add(buttonClassName)
        button.appendChild(createIcon(type, todoId))
        button.addEventListener('click', function() {handleButtonClick(type, todoId)})
        return button
    } 
    const createIcon = (type, id)  => {
        let icon = document.createElement('i');
        let iconClassName = ""
        let iconId = ``
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
        }
        icon.className = iconClassName;
        icon.id = iconId
        return icon
    }
    
    
    function handleButtonClick(type, todoId) {
        switch(type) {
            case 'delete':
                handleDeleteTodo(todoId)
                break;
            case 'edit':
                handleEditTodo(todoId)
                break;
            default:
                
        }
    }   
    
    function handleCheckedClick(todoId) {
        const todo = document.getElementById(`todo-item-${todoId}`)
        todo.classList.toggle('completed')
        const isChecked = document.getElementById('checked').checked
        const myTodo = getTodoById(todoId)
        myTodo.checked = isChecked
        updateTodoInLS(myTodo)        
    }
    
    function handleSubmitTodo(e) {
        e.preventDefault();
        let input = document.getElementById('new-task-input');
        if (input.value.trim() != '') { 
            addTodo(input.value)
        }else {
            alert("You didnt enter any Todo")
        }
        input.value = '';
    }
    
    function handleDeleteTodo(todoId) {
        let li = document.getElementById(`todo-list-item-${todoId}`)
        removeTodoFromLocalStorage(todoId)
        li.remove()
    }
    
    function handleEditTodo(todoId){
        let todoItem = document.getElementById(`todo-item-${todoId}`)
        const myTodo = getTodoById(todoId)
        myTodo.todoText = todoItem.value
        updateTodoInLS(myTodo);
        todoItem.disabled = !todoItem.disabled;
    }
    
    function createTodoItem(todo) {
        const {todoText, todoId} = todo; 
        let li = document.createElement('li')
        let todoDiv = document.createElement('input');
        todoDiv.classList.add('todo-item');
        todoDiv.disabled = true
        todoDiv.id = (`todo-item-${todoId}`)
        todoDiv.value = todoText
        todo.checked ? todoDiv.classList.toggle('completed') : ''
        const deleteButton = createButton('delete', todoId)
        const editButton = createButton('edit', todoId)
        const checked = createCheck(todo);
    
        li.appendChild(checked)
        li.appendChild(todoDiv)
        li.appendChild(deleteButton)
        li.appendChild(editButton)
        li.classList.add('todo-list-item')
        li.id = (`todo-list-item-${todoId}`)
        return li
    }
    
    function addTodo(todoText) {
        const todoListArr = loadTodoListFromLS()
        const todoId = todoListArr.length
        const newTodo = {"todoText": todoText, "todoId": todoId, "checked": false}
        createTodoListElementTag(newTodo)
        saveTodoToLocalStorage(newTodo)
    }

    function loadTodosToBrowser() {
        let todoListArr = loadTodoListFromLS()
        todoListArr.forEach((todo) => {
            createTodoListElementTag(todo)
        });
    }

    function createTodoListElementTag(todo){
        let ul = document.getElementById('todo-list');
        let li = createTodoItem(todo);
        ul.appendChild(li)
    }
        loadTodosToBrowser()
        document.getElementById('todo-button').addEventListener('click', handleSubmitTodo);
      })();

