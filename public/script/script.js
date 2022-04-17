'use strict';

const addTaskButton = document.querySelector('.add-task-form-button');
const nameForm = document.querySelector('.name-input');
const completedForm = document.querySelector('.completed-input')
const errorMessage = document.querySelector('.error');
const tasksConteinter = document.querySelector('.tasks');
let deleteButtons = '';
const options = document.querySelector('.options');
const deleteOption = document.querySelector('.delete-option');
const showAddMenu = document.querySelector('.fi-rs-angle-right');
const addMenu = document.querySelector('.add-task-form');
const logo = document.querySelector('.logo');
const menuButton = document.querySelector('.fi-rr-menu-burger');
const menuElement = document.querySelector('.menu');

let allTasks = '';

class Task {
    constructor(id, name, isCompleted) {
        this.id = id;
        this.name = name;
        this.isCompleted = isCompleted;
        
    }

};

let tasks = [];
let pickedTask = '';


const getAllTasks = async () => {

    tasks = [];
 
    const response = await fetch('http://localhost:3000/task');
    const data = await response.json();

    data.forEach((task) => {
        const newTask = new Task(task._id,task.name, task.isCompleted);
        tasks.push(newTask);
    });
    await printAllTasks();
};



const printAllTasks = async () => {

    tasksConteinter.textContent = '';
    
    tasks.forEach(task => {
        const name = task.name;
        const isCompleted = task.isCompleted ? "Completed" : "Not Completed";
    
        const html = ` 
        <div class="task" value=${task.id}>
            <div class="info">
                <h3>${name}</h3>
                <p>${isCompleted}</p>
            </div>
            <div class='funct'>
                <i class="fi fi-br-check"></i>
                <i class="fi fi-br-cross"></i>
            </div>
        </div>`;
    
        tasksConteinter.insertAdjacentHTML('afterbegin', html);
    });

    deleteButtons = document.querySelectorAll('.fi-br-cross');

    deleteButtons.forEach(deleteButton => {
        deleteButton.addEventListener('click', async function() {
    
            const taskId = this.closest('.task').getAttribute('value');
            const res = await fetch('http://localhost:3000/task', {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    _id: taskId
                })
            });
            getAllTasks();
        });
    });
}
addTaskButton.addEventListener('click', (event) => {
    event.preventDefault();
    
    const name = nameForm.value;
    const isCompleted = completedForm.checked;

    nameForm.value = '';

    if(name === '') {
       return errorMessage.style.opacity = 1;
    } else {
        errorMessage.style.opacity = 0;
    }

    const task = {
        name,
        isCompleted
    };

    fetch('http://localhost:3000/task', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    }).then(res => {
        console.log(res);
    });

    getAllTasks();
});


showAddMenu.addEventListener('click', () => {
    addMenu.classList.toggle('add-task-form-visible');
});


const animateLogo = () => {
    const logoValue = logo.textContent;
    logo.textContent = "";
    logoValue.split('').forEach(letter => {
        const html = `<div class="logo-letter">${letter}</div>`;
        logo.insertAdjacentHTML("beforeend", html);
    });

    const logoLetter = document.querySelectorAll('.logo-letter');
    console.log(logoLetter);
    logoLetter.forEach(letter => {
        letter.addEventListener('mouseenter', function(event) {
            this.style.transition = "all .1s ease-in"
            this.style.color = "#E2B714";
            this.style.cursor = "default"
        });

        letter.addEventListener('mouseleave', function(event) {
            this.style.color = "#eeeeee";
        });
    });
}

const showMenu = () => {

    menuButton.addEventListener('mouseenter', function() {
        this.style.color = "#E2B714";
    });

    menuButton.addEventListener('mouseleave', function() {
        this.style.color = "#eeeeee";
    });

    menuButton.addEventListener('click', function() {
        console.log(menuElement.classList);
        menuElement.classList.toggle('menu-visible');
    });
};

const menuFuncAnimation = () => {
    const menuFun = document.querySelectorAll('.menu-func');
    document.documentElement.style.setProperty('--under_width', '0px');

    menuFun.forEach(func => {
        func.addEventListener('mouseenter', function() {
            document.documentElement.style.setProperty('--under_width', this.offsetWidth);
        });
    });



};


getAllTasks();
animateLogo();
menuFuncAnimation();
showMenu();


