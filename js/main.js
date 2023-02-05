let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");


let deleteAll = document.querySelector(".delete-all");

// Empty Array

let arrayOfTasks = [];


if (localStorage.getItem("task")) {
    arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}

getDataFromLocalStorage();


submit.onclick = function () {
    if (input.value !== "") {
        addTasksTOArray(input.value);
        input.value = "";
    }
}


tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {

        deleteTaskWith(e.target.parentElement.parentElement.getAttribute("data-id"));

        e.target.parentElement.parentElement.remove();

    }

    if (e.target.classList.contains("donebutton")) {
        toggleStatusTask(e.target.parentElement.parentElement.getAttribute("data-id"));

        e.target.parentElement.parentElement.classList.toggle("done");
    }
})


function addTasksTOArray(tasksText) {
    const task = {
        id: Date.now(),
        title: tasksText,
        completed: false,
    }

    arrayOfTasks.push(task);
    addElementToPage(arrayOfTasks);
    addToLocaltorage(arrayOfTasks);
}

// addTasksTOArray(input.value);


function addElementToPage(arrayOfTasks) {
    tasksDiv.innerHTML = "";
    arrayOfTasks.forEach(element => {

        
        let div = document.createElement("div");
        div.className = "task";

        if (element.completed ==true) {
            div.className = "task done";
        }

        div.setAttribute("data-id", element.id);
        div.appendChild(document.createTextNode(element.title));
        let doneButton = document.createElement("i");
        doneButton.className = "donebutton fa-solid fa-check btn btn-danger"
        let colseButton = document.createElement("i");
        
        colseButton.className = "del fa-solid fa-xmark btn btn-danger"

        let icons = document.createElement("span");
        icons.className = "icons";
        icons.appendChild(doneButton)

        icons.appendChild(colseButton)

        div.appendChild(icons);
        tasksDiv.appendChild(div);
    });
}


function addToLocaltorage(arrayOfTasks) {
    window.localStorage.setItem("task", JSON.stringify(arrayOfTasks));

}

function getDataFromLocalStorage() {
    let data = window.localStorage.getItem("task");
    if (data) {
        let taskOff = JSON.parse(data);
        addElementToPage(taskOff);
    }
}



function deleteTaskWith(taskId) {

    arrayOfTasks = arrayOfTasks.filter((e) => e.id != taskId);

    addToLocaltorage(arrayOfTasks);
}

function toggleStatusTask(taskId) {
    for (let i = 0; i < arrayOfTasks.length; i++){
        // console.log(`${arrayOfTasks[i].id} ==${taskId} `);
        if (arrayOfTasks[i].id == taskId) {
            arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
        }
    }

    addToLocaltorage(arrayOfTasks);
}


function reset() {
    tasksDiv.innerHTML = "";
    window.localStorage.clear();
    arrayOfTasks = [];

}

deleteAll.onclick = function () {
    reset();
}

let addButton = document.querySelector(".add-button");

addButton.onclick = function () {
    input.focus();
}


