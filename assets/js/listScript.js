const tasksList = document.getElementById('tasks');
const taskInput = document.getElementById('task'); 
const eventWizardButton = document.getElementById('eventWizardButton');
const clearEventsButton = document.getElementById('clearEventsButton');

// Load tasks from local storage and render them
loadTasks();

eventWizardButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim(); 
    if (taskText) {
        window.location.href = `wizard.html?task=${encodeURIComponent(taskText)}`;
    } else {
        alert('Please enter a task before proceeding to the Event Wizard.');
    }
});

clearEventsButton.addEventListener('click', () => {
    clearAllTasks();
});

function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        renderTask(task);
    });
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('eventArray');
    return tasks ? JSON.parse(tasks) : [];
}

function renderTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `<strong>Name:</strong> ${task.name} <br> <strong>Date:</strong> ${task.date} <br> <strong>Description:</strong> ${task.desc}`;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        removeTask(task.id);
    });

    li.appendChild(deleteButton);
    tasksList.appendChild(li);
} 


function removeTask(taskId) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem('eventArray', JSON.stringify(tasks));
    tasksList.innerHTML = '';
    loadTasks();
}

function clearAllTasks() {
    localStorage.removeItem('eventArray');
    tasksList.innerHTML = '';
}

function addTask(taskName, taskDate, taskDescription) {
    const tasks = getTasksFromLocalStorage();
    const task = { name: taskName, date: taskDate, description: taskDescription, id: Date.now() }; // Example task object with name, date, description, and id
    tasks.push(task);
    localStorage.setItem('eventArray', JSON.stringify(tasks));
    renderTask(task);
}