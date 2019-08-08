// Defining UI vars

const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

LoadEventListeners();

function LoadEventListeners(){
    form.addEventListener('submit',addTask);
    
}

function addTask(e){
    
    if(taskInput.value === ''){
        alert('Add a Task');
    }
    else{
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

        //Clear input
        taskInput.value = '';
    }
    e.preventDefault();
}