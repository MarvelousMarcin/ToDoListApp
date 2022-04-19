'use strict';

const addTaskButton = document.querySelector('.add-task-form-button');
const nameForm = document.querySelector('.name-input');
const completedForm = document.querySelector('.completed-input')
const errorMessage = document.querySelector('.error');
let deleteButtons = '';
const showAddMenu = document.querySelector('.fi-rs-angle-right');
const addMenu = document.querySelector('.add-task-form');
const logo = document.querySelector('.logo');
const menuButton = document.querySelector('.fi-rr-menu-burger');
const menuElement = document.querySelector('.menu');
const welcomeText = document.querySelector('.welcome-text');
const todolist = document.querySelector('.todolist-func');
const mainPage = document.querySelector('.main-page-func');
const tasksElem = document.querySelector('.tasks');

let allTasks = '';

class Task {
    constructor(id, name, isCompleted) {
        this.id = id;
        this.name = name;
        this.isCompleted = isCompleted;
    }
};


const animateLogo = () => {
    const logoValue = logo.textContent;
    logo.textContent = "";
    logoValue.split('').forEach(letter => {
        const html = `<div class="logo-letter">${letter}</div>`;
        logo.insertAdjacentHTML("beforeend", html);
    });

    const logoLetter = document.querySelectorAll('.logo-letter');
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
        this.style.transform = "scale(1.2)";
    });

    menuButton.addEventListener('mouseleave', function() {
        this.style.color = "#eeeeee";
        this.style.transform = "scale(1)";
    });

    menuButton.addEventListener('click', function() {
        menuElement.classList.toggle('menu-visible');

        const menuFun = document.querySelectorAll('.menu-func');

        if(!menuElement.classList.contains('menu-visible')) {
            menuFun.forEach(func => {
                func.style.opacity = '0';
            });
            return;
        }

        const timer = setInterval(onTick, 200);

        let char = 0;
    
        function onTick(){
            const oneFun = menuFun[char];
            oneFun.style.opacity = '1';
            char++;
    
            if(char === menuFun.length){
                complete();
                return;
            }
    
        };
    
        function complete() {
            clearInterval(timer);
        }
    });
};

const menuFuncAnimation = () => {
    const menuFun = document.querySelectorAll('.menu-func');
    document.documentElement.style.setProperty('--under_width', '0px');


    menuFun.forEach(func => {
        func.addEventListener('mouseenter', function() {
            document.documentElement.style.setProperty('--under_width', this.offsetWidth -2);
        });
    });
};

const welcomeTextAnimation = () => {
    const textValue = welcomeText.textContent;
    welcomeText.textContent = "";
    
    let findSign = false;
    textValue.split('').forEach(letter => {
        let html = '';
        if(letter === '.') {
            html = `<span class="welcome-text-span dots">${letter}</span>`;
        } else if(letter === ',') {
            findSign = true;
        } else if(findSign) {
            html = `<span class="welcome-text-span name-letter">${letter}</span>`;
        } else {
            html = `<span class="welcome-text-span">${letter}</span>`;
        }

        welcomeText.insertAdjacentHTML("beforeend", html);
    });

    const nameLetters = document.querySelectorAll('.name-letter');
    nameLetters.forEach(letter => {
        letter.style.color = "#E2B714";
    })
};

const mainPageApp = () => {
    const moveDown= () => {
        welcomeText.style.transform = "translateY(0)";
    }
    mainPage.addEventListener('click', function(event){
        tasksElem.style.transform = "scale(0)";
        moveDown();
    });
}

const toDoListApp = () => {

    const moveUp = () => {
        tasksElem.style.transform = "scale(1)";
        welcomeText.style.transform = "translateY(-15rem)";
    }
    
    todolist.addEventListener('click', async function(event){
        moveUp();
    });
}

animateLogo();
menuFuncAnimation();
showMenu();
welcomeTextAnimation();
toDoListApp();
mainPageApp();


