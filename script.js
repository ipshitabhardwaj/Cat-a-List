document.addEventListener('DOMContentLoaded', () => {
    const addTaskBtn = document.getElementById('add-task-btn');
    const newTaskInput = document.getElementById('new-task');
    const taskDateInput = document.getElementById('task-date');
    const taskCategoryInput = document.getElementById('task-category');
    const taskPrioritySelect = document.getElementById('task-priority');
    const taskList = document.getElementById('task-list');

    // Load tasks from localStorage
    loadTasks();

    // Add new task
    addTaskBtn.addEventListener('click', () => {
        const taskText = newTaskInput.value.trim();
        const taskDate = taskDateInput.value;
        const taskCategory = taskCategoryInput.value.trim();
        const taskPriority = taskPrioritySelect.value;
        
        if (taskText !== '' && taskDate !== '') {
            const taskItem = createTaskItem(taskText, taskDate, taskCategory, taskPriority);
            taskList.appendChild(taskItem);
            newTaskInput.value = '';
            taskDateInput.value = '';
            taskCategoryInput.value = '';
            taskPrioritySelect.value = 'low';
            saveTasks();
        }
    });

    // Create task item
    function createTaskItem(taskText, taskDate, taskCategory, taskPriority, completed = false) {
        const li = document.createElement('li');
        li.innerHTML = `<span>${taskText} (Due: ${taskDate}) [${taskCategory}] - ${taskPriority.charAt(0).toUpperCase() + taskPriority.slice(1)}</span>`;
        
        if (completed) {
            li.classList.add('completed');
        }

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.classList.add('edit-btn');
        editBtn.addEventListener('click', () => editTask(li));

        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'Done';
        doneBtn.classList.add('done-btn');
        doneBtn.addEventListener('click', () => {
            li.classList.toggle('completed');
            showCatImage();
            saveTasks();
        });

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            saveTasks();
        });

        li.appendChild(editBtn);
        li.appendChild(doneBtn);
        li.appendChild(deleteBtn);
        return li;
    }

    // Edit task
    function editTask(li) {
        const currentText = li.querySelector('span').textContent;
        const newText = prompt('Edit task:', currentText);
        if (newText !== null) {
            li.querySelector('span').textContent = newText.trim();
            saveTasks();
        }
    }

    // Show cat image
    function showCatImage() {
        const img = document.createElement('img');
        img.src = 'cat-image.png'; // Ensure the path is correct
        img.classList.add('cat-image');
        document.body.appendChild(img);
        setTimeout(() => {
            img.remove();
        }, 3000); // Remove the image after 3 seconds
    }

    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(task => {
            const taskText = task.querySelector('span').textContent;
            const taskDate = taskText.match(/\(Due: (.*)\)/)[1];
            const taskDescription = taskText.replace(/\(Due: .*\)/, '').replace(/\[.*\]/, '').trim();
            const taskCategory = taskText.match(/\[(.*)\]/)[1];
            const taskPriority = taskText.split(' - ').pop().toLowerCase();
            tasks.push({
                text: taskDescription,
                date: taskDate,
                category: taskCategory,
                priority: taskPriority,
                completed: task.classList.contains('completed')
            });
        });
        tasks.sort((a, b) => new Date(a.date) - new Date(b.date));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const taskItem = createTaskItem(task.text, task.date, task.category, task.priority, task.completed);
                taskList.appendChild(taskItem);
            });
        }
    }
});

