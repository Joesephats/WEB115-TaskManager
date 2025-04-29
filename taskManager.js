let taskList = []

document.getElementById("taskManager").addEventListener('submit', function(e){
    e.preventDefault();

    let title = document.getElementById("taskNameInput").value;
    let prio = document.getElementById("priorityList").value;
    let isImportant = document.getElementById("importantCheck").checked;

    let currentDateTime = new Date();
    let today = currentDateTime.toLocaleDateString();
    let now = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    let taskDate = today + " " + now;

    //console.log("Task Info: " + title + " " + prio + " " + isImportant + " " + taskDate);
    AddTask(title, prio, taskDate, isImportant);
})

function AddTask(taskTitle, taskPrio, taskDate, taskIsImportant)
{
    let newTaskNode = ConstructTaskNode(taskTitle, taskPrio, taskDate, taskIsImportant);
    let tasksDiv = document.getElementById("tasks");
    tasksDiv.appendChild(newTaskNode);

    let deleteButton = newTaskNode.querySelector(".deleteButton");
    let completeCheckbox = newTaskNode.querySelector(".completeCheckbox");
    

    let newTask = new Task(taskTitle, taskPrio, taskDate, taskIsImportant);
    taskList.push(newTask);
    console.log(JSON.stringify(taskList));

    if (taskPrio == "High"){
        newTaskNode.querySelector(".taskPriority").style.backgroundColor = 'rgb(226, 91, 47)'
    }
    else if (taskPrio == "Medium"){
        newTaskNode.querySelector(".taskPriority").style.backgroundColor = "rgb(241, 239, 68)"
    }

    deleteButton.addEventListener("click", function(){
        //Delete task object
        taskList.splice(taskList.indexOf(newTask), 1);
        console.log(JSON.stringify(taskList));

        //Delete parent task div
        newTaskNode.remove();
    })

    completeCheckbox.addEventListener("change", function(){
        newTaskNode.classList.toggle("complete", completeCheckbox.checked)
        newTask.isComplete = !newTask.isComplete;
        console.log(JSON.stringify(taskList));
    })
}

function ConstructTaskNode(_taskTitle, _taskPrio, _taskDate, _isImportant)
{
    // Create task div with child ordered list,
    let newTaskNode = document.createElement("div");
        newTaskNode.classList.add("task");

        if (_isImportant){
            newTaskNode.classList.add("important");
        }

    let taskDetails = document.createElement("ol");
        taskDetails.classList.add("taskDetails")
    
    newTaskNode.appendChild(taskDetails);

    // li's for task details
    let taskName = document.createElement("li");
        taskName.textContent = _taskTitle;
        taskName.classList.add("taskName");

    let taskPrio = document.createElement("li");
        taskPrio.textContent = _taskPrio;
        taskPrio.classList.add("taskPriority");

    let taskDate = document.createElement("li");
        taskDate.textContent = _taskDate;
        taskDate.classList.add("taskDate");

    // li for complete checkbox
    let completeCheckLi = document.createElement("li");

    let completeCheckLabel = document.createElement("label")
        completeCheckLabel.innerHTML = "Complete";

    let completeCheckbox = document.createElement("input")
        completeCheckbox.classList.add("completeCheckbox")
        completeCheckbox.type = "checkbox";
        completeCheckbox.name = "completeCheckbox";

    completeCheckLabel.appendChild(completeCheckbox)
    completeCheckLi.appendChild(completeCheckLabel);

    // Function when 'complete' checkbox is checked or unchecked
    completeCheckbox.addEventListener("change", function(){
        newTaskNode.classList.toggle("complete", completeCheckbox.checked)

        console.log(JSON.stringify(taskList));
    })

    // li for delete button
    let deleteButtonLi = document.createElement("li");

    let deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete";

    deleteButtonLi.appendChild(deleteButton);
        // Delete button event listener added inside of AddTask()

    // Append li's to ol for task info
    taskDetails.append(taskName, taskPrio, taskDate, completeCheckLi, deleteButtonLi)

    return newTaskNode;
}

class Task
{
    constructor(_title, _priority, _date, _isImportant)
    {
        this.title = _title;
        this.priority = _priority;
        this.date = _date;
        this.isComplete = false;
        this.isImportant = _isImportant;
    }
}