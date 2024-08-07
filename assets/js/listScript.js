document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form, input field, and tasks list
    const tasksForm = document.getElementById('tasks-form');
    const tasksInput = document.getElementById('tasks-input');
    const tasksList = document.getElementById('tasks');

    // Load tasks from local storage when the page loads
    loadTasks();

    // Add event listener to the form to handle task submission
    tasksForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const taskText = tasksInput.value.trim(); // Get the trimmed value of the input field
        
        if (taskText) {
            addTask(taskText); // Add the task if the input is not empty
            tasksInput.value = ''; // Clear the input field
            tasksInput.focus(); // Focus the input field for the next task
        }
    });

    // Function to add a task to local storage and re-render the tasks list
    function addTask(taskText) {
        const tasks = getTasksFromLocalStorage(); // Get the current tasks from local storage
        tasks.push(taskText); // Add the new task to the tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the updated tasks array to local storage
        renderTasks(); // Re-render the tasks list
    }

    // Function to remove a task from local storage and re-render the tasks list
    function removeTask(taskText) {
        let tasks = getTasksFromLocalStorage(); // Get the current tasks from local storage
        tasks = tasks.filter(task => task !== taskText); // Filter out the task to be removed
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the updated tasks array to local storage
        renderTasks(); // Re-render the tasks list
    }

    // Function to load tasks from local storage and render them
    function loadTasks() {
        renderTasks(); // Render the tasks list
    }

    // Function to get tasks from local storage
    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks'); // Get the tasks from local storage
        return tasks ? JSON.parse(tasks) : []; // Parse and return the tasks, or return an empty array if no tasks are found
    }

    // Function to render the tasks list
    function renderTasks() {
        const tasks = getTasksFromLocalStorage(); // Get the current tasks from local storage
        tasksList.innerHTML = ''; // Clear the current tasks list
        tasks.forEach(task => {
            const li = document.createElement('li'); // Create a new list item for each task
            li.textContent = task; // Set the text content of the list item to the task
            const removeButton = document.createElement('button'); // Create a remove button for the task
            removeButton.textContent = 'Remove'; // Set the text content of the remove button
            removeButton.addEventListener('click', () => removeTask(task)); // Add an event listener to the remove button to handle task removal
            li.appendChild(removeButton); // Append the remove button to the list item
            tasksList.appendChild(li); // Append the list item to the tasks list
        });
    }
});