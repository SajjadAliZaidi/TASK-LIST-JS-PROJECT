// Defining UI vars

const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

LoadEventListeners();

function LoadEventListeners() {
    //DOM Load Event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove task Event
    taskList.addEventListener('click', removeTask);
    //Clear task Event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Task Event
    filter.addEventListener('keyup', filterTasks);
}

//Get tasks from local Storage of browser
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(task));
        //Create new link element for deleting a task
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //Append link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);

    });
}

function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    document.querySelectorAll('.collection-item').forEach(function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) !== -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    })

    console.log(text);
}

function clearTasks(e) {
    // first way
    // taskList.innerHTML = '';

    // 2nd and Faster way
    if (confirm('Delete all Tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            //Remove from Browser's Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }

    e.preventDefault();
}

function removeTaskFromLocalStorage(taskItem){

    let tasks;
    if(localStorage.getItem('tasks')===null)
    {
        tasks=[];
    }
    else
    {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task,index){
        if(taskItem.textContent === task){
            tasks.splice(index,1); 
        }
    });

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function addTask(e) {

    if (taskInput.value === '') {
        alert('Add a Task');
    }
    else {
        //Create li element
        const li = document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        //Create new link element for deleting a task
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<i class="fa fa-remove"></i>'
        //Append link to li
        li.appendChild(link);
        //Append li to ul
        taskList.appendChild(li);

        //Store in local Storage
        storeTaskInLocalStorage(taskInput.value);

        //Clear input
        taskInput.value = '';
    }
    e.preventDefault();
}

function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}