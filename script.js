document.addEventListener("DOMContentLoaded", function () {
    // Load tasks from localStorage when the page loads
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(taskInput.value));

        // Add a delete button to each task
        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.appendChild(document.createTextNode("Delete"));
        deleteButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Save tasks after deletion
        };
        li.appendChild(deleteButton);

        // Insert new task at the beginning of the list
        taskList.insertBefore(li, taskList.firstChild);

        taskInput.value = "";
        saveTasks(); // Save tasks after addition
    }
}


function checkEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

function deleteAllTasks() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Remove all tasks from the list
    saveTasks(); // Save tasks after deletion
}

// Save tasks to localStorage
function saveTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = Array.from(taskList.children).map(function (li) {
        return li.firstChild.textContent;
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    var taskList = document.getElementById("taskList");
    var tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function (task) {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(task));

        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.appendChild(document.createTextNode("Delete"));
        deleteButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks();
        };
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });
}
