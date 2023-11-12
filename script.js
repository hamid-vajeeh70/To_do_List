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
        deleteButton.onclick = function() {
            taskList.removeChild(li);
        };
        li.appendChild(deleteButton);
    }
}

function checkEnter(event) {
    if (event.key === "Enter") {
        addTask();
    }
}

