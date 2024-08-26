document.addEventListener("DOMContentLoaded", function () {
    const addTodoButton = document.getElementById('addTodoButton');
    const saveTodoButton = document.getElementById('saveTodoButton');
    const todoList = document.getElementById('todoList');
    const todoInput = document.getElementById('todoInput');
    const emptyState = document.getElementById('emptyState');
    const todoForm = document.getElementById('todoForm');
    const closeButton = document.querySelector('.close');
    let editIndex = null;

    // tampilan form modal
    addTodoButton.addEventListener('click', function () {
        todoInput.value = '';
        todoForm.style.display = 'flex';
    });

    closeButton.addEventListener('click', function () {
        todoForm.style.display = 'none';
    });

    saveTodoButton.addEventListener('click', function () {
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            if (editIndex !== null) {
                todoList.children[editIndex].querySelector('.todo-text').textContent = todoText;
                editIndex = null;
            } else {
                addTodoItem(todoText);
            }
            todoForm.style.display = 'none';
            updateEmptyState();
        }
    });

    // Menambah item to-do
    function addTodoItem(text) {
        const li = document.createElement('li');
        li.className = 'todo-item';

        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = text;
        li.appendChild(todoText);

        const buttons = document.createElement('div');
        buttons.className = 'buttons';

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.className = 'complete';
        completeButton.addEventListener('click', function () {
            li.classList.toggle('completed');
        });
        buttons.appendChild(completeButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit';
        editButton.addEventListener('click', function () {
            todoInput.value = text;
            editIndex = Array.from(todoList.children).indexOf(li);
            todoForm.style.display = 'flex';
        });
        buttons.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.addEventListener('click', function () {
            todoList.removeChild(li);
            updateEmptyState();
        });
        buttons.appendChild(deleteButton);

        li.appendChild(buttons);
        todoList.appendChild(li);
    }

    function updateEmptyState() { //update empty state
        if (todoList.children.length === 0) {
            emptyState.style.display = 'block';
        } else {
            emptyState.style.display = 'none';
        }
    }
    updateEmptyState();
});