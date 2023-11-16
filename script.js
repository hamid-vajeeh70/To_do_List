// Load tasks from localStorage when the page loads
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskList = document.getElementById("taskList");

    if (taskInput.value.trim() !== "") {
        var li = document.createElement("li");
        li.appendChild(document.createTextNode(taskInput.value));
        taskList.appendChild(li);
        taskInput.value = "";

        // Add a delete button to each task
        var deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.appendChild(document.createTextNode("Delete"));
        deleteButton.onclick = function () {
            taskList.removeChild(li);
            saveTasks(); // Save tasks after deletion
        };
        li.appendChild(deleteButton);

        saveTasks(); // Save tasks after addition
    }
}

function checkEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
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
