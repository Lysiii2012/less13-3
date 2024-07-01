document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('todo-list');
    const addTaskBtn = document.getElementById('add-task');
    const newTaskInput = document.getElementById('new-task');
     
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            addTaskToDOM(task.text, task.completed);
        });
    }
     
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(li => {
            tasks.push({
                text: li.querySelector('span').textContent,
                completed: li.querySelector('input[type="checkbox"]').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    } 

    function addTaskToDOM(taskText, completed = false) {
        const li = document.createElement('li'); 
        li.className = 'task';
        if (completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `<input type='checkbox' ${completed ? 'checked' : ''}> <span>${taskText}</span> <button>Видалити</button>`;
        taskList.appendChild(li);
    }
    
    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            addTaskToDOM(taskText);
            saveTasks();
            newTaskInput.value = ''; 
        } else {
            alert('Будь ласка, введіть завдання');
        }
    });
    
    taskList.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const li = e.target.closest('li');
            li.remove(); 
            saveTasks();
        } else if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
            const li = e.target.closest('li');
            li.classList.toggle('completed', e.target.checked);
            saveTasks();
        }
    });
    
    loadTasks();
});