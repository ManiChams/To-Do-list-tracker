// Get references to DOM elements
const tasksList = document.getElementById('tasks');
const taskInput = document.getElementById('task'); 
const eventWizardButton = document.getElementById('eventWizardButton');
const clearEventsButton = document.getElementById('clearEventsButton');

// Load tasks from local storage and render them on page load
loadTasks();

// Event listener for the Event Wizard button
eventWizardButton.addEventListener('click', () => {
    const taskText = taskInput.value.trim(); 
    if (taskText) {
        // Redirect to the wizard page with the task text as a query parameter
        window.location.href = `wizard.html?task=${encodeURIComponent(taskText)}`;
    } else {
        // Alert the user to enter a task if the input is empty
        alert('📝 Please enter a task before proceeding to the Event Wizard.');
    }
});

// Event listener for the Clear Events button
clearEventsButton.addEventListener('click', () => {
    // Confirm with the user before clearing all tasks
    if (confirm('🗑️ Are you sure you want to clear all tasks?')) {
        clearAllTasks();
    }
});

// Function to load tasks from local storage and render them
function loadTasks() {
    const tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        renderTask(task);
    });
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
    const tasks = localStorage.getItem('eventArray');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to render a task in the task list
function renderTask(task) {
    // Create a list item element for the task
    const li = document.createElement('li');
    // Set the inner HTML of the list item with task details and emojis
    li.innerHTML = `<strong>📝 Name:</strong> ${task.name} <br> <strong>📅 Date:</strong> ${task.date} <br> <strong>🗒️ Description:</strong> ${task.desc}`;

    // Create a delete button for each task
    const deleteButton = document.createElement('button');
    // Set the text content of the delete button
    deleteButton.textContent = '❌ Delete';
    // Add an event listener to the delete button to handle task removal
    deleteButton.addEventListener('click', () => {
        removeTask(li);
    });

    // Append the delete button to the task item
    li.appendChild(deleteButton);
    // Append the task item to the task list
    tasksList.appendChild(li);
}

// Function to remove a task from the list and local storage
function removeTask(taskElement) {
    tasksList.removeChild(taskElement);
    saveTasks();
}

// Function to clear all tasks from the list and local storage
function clearAllTasks() {
    tasksList.innerHTML = '';
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    tasksList.querySelectorAll('li').forEach(taskElement => {
        const task = {
            name: taskElement.querySelector('strong:nth-child(1)').textContent.replace('📝 Name:', '').trim(),
            date: taskElement.querySelector('strong:nth-child(2)').textContent.replace('📅 Date:', '').trim(),
            desc: taskElement.querySelector('strong:nth-child(3)').textContent.replace('🗒️ Description:', '').trim()
        };
        tasks.push(task);
    });
    localStorage.setItem('eventArray', JSON.stringify(tasks));
}