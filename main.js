// Retrieve elements from the DOM
const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const taskSummary = document.getElementById('taskSummary');

// Function to generate a unique ID for tasks
const generateTaskId = () => '_' + Math.random().toString(36).substr(2, 9);

// Function to calculate and update task summary
const updateTaskSummary = () => {
    const totalTasks = document.querySelectorAll('#taskList li').length;
    const completedTasks = document.querySelectorAll('#taskList li.task-completed').length;
    const remainingTasks = totalTasks - completedTasks;

    taskSummary.innerHTML = `
        <strong>Total Tasks:</strong> ${totalTasks} |
        <strong>Completed:</strong> ${completedTasks} |
        <strong>Remaining:</strong> ${remainingTasks}
    `;
};

// Event listener for form submission
todoForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const taskText = taskInput.value.trim(); // Get task text and trim whitespace

    if (taskText !== '') {
        // Create new task item
        const taskId = generateTaskId();
        const taskItem = document.createElement('li');
        taskItem.setAttribute('data-id', taskId);
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <div>
                <button class="complete-btn">Complete</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        // Add task item to task list
        taskList.appendChild(taskItem);

        // Clear input field
        taskInput.value = '';

        // Attach event listeners to task buttons
        const completeButton = taskItem.querySelector('.complete-btn');
        const deleteButton = taskItem.querySelector('.delete-btn');

        completeButton.addEventListener('click', function() {
            taskItem.classList.toggle('task-completed');
            updateTaskSummary();
        });

        deleteButton.addEventListener('click', function() {
            taskItem.remove();
            updateTaskSummary();
        });

        // Update task summary
        updateTaskSummary();
    }
});

// Initial task summary update
updateTaskSummary();