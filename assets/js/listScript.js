const tasksList = document.getElementById('tasks');
const taskInput = document.getElementById('task'); 
const eventWizardButton = document.getElementById('eventWizardButton');
const clearEventsButton = document.getElementById('clearEventsButton');
const addButton = document.getElementById('add');

// Load tasks from local storage and render them
loadTasks();

addButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTask(taskText);
        taskInput.value = '';
        taskInput.focus();
    }
});

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

function addTask(taskText) {
    const tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('eventArray', JSON.stringify(tasks));
    renderTasks();
}

function removeTask(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks = tasks.filter(task => task !== taskText);
    localStorage.setItem('eventArray', JSON.stringify(tasks));
    renderTasks();
}

function clearAllTasks() {
    localStorage.removeItem('eventArray');
    renderTasks();
}

function loadTasks() {
    renderTasks();
}

function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('eventArray');
    return tasks ? JSON.parse(tasks) : [];
}

function renderTasks() {
    const tasks = getTasksFromLocalStorage();
    tasksList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task;
        tasksList.appendChild(li);
    });
}