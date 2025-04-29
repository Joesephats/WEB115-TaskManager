//Declare list for Task objects
let taskList = []

//When user clicks submit button
document.getElementById("taskManager").addEventListener('submit', function(e){
    //Prevent normal form submission
    e.preventDefault();

    //Get user defined task information
    let title = document.getElementById("taskNameInput").value;
    let prio = document.getElementById("priorityList").value;
    let isImportant = document.getElementById("importantCheck").checked;

    //Get date information
    let currentDateTime = new Date();
    let today = currentDateTime.toLocaleDateString();
    let now = currentDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'});
    let taskDate = today + " " + now;

    //Call AddTask with user info and date info.
    AddTask(title, prio, taskDate, isImportant);
})

//Creates new task node structure and Task object, appends each to the appropriate list, adds event listeners to delete button, and complete checkbox 
function AddTask(taskTitle, taskPrio, taskDate, taskIsImportant)
{
    //Constructing node structure and append to DOM
    let newTaskNode = ConstructTaskNode(taskTitle, taskPrio, taskDate, taskIsImportant);
    let tasksDiv = document.getElementById("tasks");
    tasksDiv.appendChild(newTaskNode);

    //Get references to elements to add event listeners
    let deleteButton = newTaskNode.querySelector(".deleteButton");
    let completeCheckbox = newTaskNode.querySelector(".completeCheckbox");
    
    //Create Task object, log to console
    let newTask = new Task(taskTitle, taskPrio, taskDate, taskIsImportant);
    taskList.push(newTask);
    console.log(JSON.stringify(taskList));

    //Styling based on priority
    if (taskPrio == "High"){
        newTaskNode.querySelector(".taskPriority").style.backgroundColor = 'rgb(226, 91, 47)'
    }
    else if (taskPrio == "Medium"){
        newTaskNode.querySelector(".taskPriority").style.backgroundColor = "rgb(241, 239, 68)"
    }

    //Delete button event. removes Task object from taskList and removes the task node structure from the DOM
    deleteButton.addEventListener("click", function(){
        //Delete task object
        taskList.splice(taskList.indexOf(newTask), 1);
        console.log(JSON.stringify(taskList));

        //Delete parent task div
        newTaskNode.remove();
    })

    //Complete checkbox event. Adds complete class (used in style rules), toggles isComplete of Task object. logs to console.
    completeCheckbox.addEventListener("change", function(){
        newTaskNode.classList.toggle("complete", completeCheckbox.checked)
        newTask.isComplete = !newTask.isComplete;
        console.log(JSON.stringify(taskList));
    })
}


//Builds the task node structure. Consists of div -> ol -> li,li,li,li,li. Returns entire node structure to AddTask()
function ConstructTaskNode(_taskTitle, _taskPrio, _taskDate, _isImportant)
{
    // Create task div with child ordered list,
    let newTaskNode = document.createElement("div");
        newTaskNode.classList.add("task");

        if (_isImportant){
            newTaskNode.classList.add("important");
        }

    // ol
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

    // li for complete checkbox. Event listener added in AddTask()
    let completeCheckLi = document.createElement("li");

    let completeCheckLabel = document.createElement("label")
        completeCheckLabel.innerHTML = "Complete";

    let completeCheckbox = document.createElement("input")
        completeCheckbox.classList.add("completeCheckbox")
        completeCheckbox.type = "checkbox";
        completeCheckbox.name = "completeCheckbox";

    completeCheckLabel.appendChild(completeCheckbox)
    completeCheckLi.appendChild(completeCheckLabel);

    // li for delete button. Event listener added in AddTask()
    let deleteButtonLi = document.createElement("li");

    let deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete";

    deleteButtonLi.appendChild(deleteButton);

    // Append li's to ol for task info
    taskDetails.append(taskName, taskPrio, taskDate, completeCheckLi, deleteButtonLi)

    return newTaskNode;
}


// Task object definition. Logged to console when a task is added, completed, or deleted.
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