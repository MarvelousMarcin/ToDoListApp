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

        const timer = setInterval(onTick, 300);

        let char = 0;
    
        function onTick(){
            const oneFun = menuFun[char];
            console.log(oneFun);
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
            document.documentElement.style.setProperty('--under_width', this.offsetWidth);
        });
    });
};

animateLogo();
menuFuncAnimation();
showMenu();


