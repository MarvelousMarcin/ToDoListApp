"use strict";

const addTaskButton = document.querySelector(".add-task-form-button");
const logo = document.querySelector(".logo");
const tasksElem = document.querySelector(".tasks");
const logout = document.querySelector(".logout");
const welcome = document.querySelector(".welcome");

const animateLogo = () => {
  const logoValue = logo.textContent;
  logo.textContent = "";
  logoValue.split("").forEach((letter) => {
    const html = `<div class="logo-letter">${letter}</div>`;
    logo.insertAdjacentHTML("beforeend", html);
  });

  const logoLetter = document.querySelectorAll(".logo-letter");
  logoLetter.forEach((letter) => {
    letter.addEventListener("mouseenter", function (event) {
      this.style.transition = "all .1s ease-in";
      this.style.color = "#E2B714";
      this.style.cursor = "default";
    });
    letter.addEventListener("mouseleave", function (event) {
      this.style.color = "#eeeeee";
    });
  });
};

logout.addEventListener("click", () => {
  document.cookie = "jwtToDoList=";
  location.href = "/";
});

const textAnimation = (text, color, speed) => {
  const letters = text.textContent;
  text.textContent = "";
  letters.split("").forEach((letter) => {
    const html = `<span class="${color} hidden">${letter}</span>`;
    text.insertAdjacentHTML("beforeend", html);
  });

  const lettersWithSpan = document.querySelectorAll(`.${color}`);

  const timer = setInterval(onTick, speed);

  let char = 0;
  function onTick() {
    lettersWithSpan[char].classList.toggle("hidden");
    char++;
    if (char === lettersWithSpan.length) {
      clearInterval(timer);
      return;
    }
  }
};

function hideWelcome() {
  welcome.style.display = "none";
}

setInterval(hideWelcome, 3000);
textAnimation(welcome, "white", 80);
animateLogo();
