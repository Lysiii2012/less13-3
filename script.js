document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('todo-list');
    const addTaskBtn = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';  
        tasks.forEach((task, index) => {
            const li = document.createElement('li'); 
            li.className = 'task';
            if (task.completed) {
                li.classList.add('completed');
            }
            li.innerHTML = `<input type='checkbox' ${task.completed ? 'checked' : ''}> <span>${task.text}</span> <button>Видалити</button>`;
            taskList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            saveTasks();
            renderTasks();
            newTaskInput.value = ''; 
        } else {
            alert('Будь ласка, введіть завдання');
        }
    });

    taskList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        const index = Array.from(taskList.children).indexOf(li);

        if (e.target.tagName === 'BUTTON') {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        } else if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            tasks[index].completed = e.target.checked;
            saveTasks();
            renderTasks();
        }
    });

    renderTasks();
});