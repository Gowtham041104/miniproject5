document.addEventListener('DOMContentLoaded', function () {
    const todoInput = document.getElementById('todoInput');
    const addtodoButton = document.getElementById('addtodoButton');
    const todoList = document.getElementById('todoList');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';

            if (todo.completed) {
                listItem.classList.add('text-decoration-line-through', 'text-muted');
            }

            listItem.textContent = todo.text;

            const deleteButton = document.createElement('button');
            deleteButton.className = 'btn btn-danger btn-sm ms-2';
            deleteButton.textContent = 'Delete';

            deleteButton.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent the toggle when delete is clicked
                deleteTodo(index);
            });

            listItem.appendChild(deleteButton);

            listItem.addEventListener('click', () => {
                toggleTodoComplete(index);
            });

            todoList.appendChild(listItem);
        });
    }

    function deleteTodo(index) {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    }

    function toggleTodoComplete(index) {
        todos[index].completed = !todos[index].completed;
        saveTodos();
        renderTodos();
    }

    function addTodo() {
        const taskText = todoInput.value.trim();
        if (taskText === '') return;

        todos.push({ text: taskText, completed: false });
        todoInput.value = '';
        saveTodos();
        renderTodos();
    }

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    addtodoButton.addEventListener('click', addTodo);

    todoInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTodo();
        }
    });

    renderTodos();
});
