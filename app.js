// Defining UI vars

const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//Load all event listeners

LoadEventListeners();

function LoadEventListeners() {
    //Add Task Event
    form.addEventListener('submit', addTask);
    //Remove task Event
    taskList.addEventListener('click', removeTask);
    //Clear task Event
    clearBtn.addEventListener('click', clearTasks);
    //Filter Task Event
    filter.addEventListener('keyup', filterTasks);
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
}

function removeTask(e) {

    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();
        }
    }

    e.preventDefault();
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

        //Clear input
        taskInput.value = '';
    }
    e.preventDefault();
}
