'use strict'

const tasksElem = document.querySelector('.tasks');

const loadTasks = async function() {

    const response = await fetch('http://localhost:3000/task');
    const data = await response.json();
    data.forEach(task => {

        const html = ` 
        <div class="task">
            <div class="task-name task-text">${task.name}</div>
            <div class="task-type task-text">Sport</div>
        </div>`;

        tasksElem.insertAdjacentHTML('beforeend', html);
    })
}

loadTasks();