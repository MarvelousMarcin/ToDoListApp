"use strict";

const addTaskButton = document.querySelector(".add-task-form-button");
const logo = document.querySelector(".logo");
const tasksElem = document.querySelector(".tasks");
const logout = document.querySelector(".logout");
const welcome = document.querySelector(".welcome");
const pomodoro = document.querySelector(".pomodoro-func");
const startPomodoro = document.querySelector(".start-timer");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

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

function showPomodoro() {}

startPomodoro.addEventListener("click", () => {
  let count = "";
  if (startPomodoro.textContent === "Start") {
    startPomodoro.textContent = "Stop";
    const minutesValue = Number(minutes.value);
    const secondsValue = Number(seconds.value);
    minutes.disabled = true;
    seconds.disabled = true;
    let sec = minutesValue * 60 + secondsValue;

    const countDown = function () {
      sec--;

      let minutesToShow = Math.floor(sec / 60);
      if (minutesToShow < 10) minutesToShow = "0" + minutesToShow;
      let secondsToShow = sec - 60 * Math.floor(sec / 60);
      if (secondsToShow < 10) secondsToShow = "0" + secondsToShow;

      if (minutesToShow === "00" && secondsToShow === "00") {
        clearInterval(count);
      }

      minutes.value = minutesToShow;
      seconds.value = secondsToShow;
    };
    count = setInterval(countDown, 1000);
  } else {
    startPomodoro.textContent = "Resume";
    clearInterval(count);
  }
});

pomodoro.addEventListener("click", showPomodoro);

//setInterval(hideWelcome, 3000);
animateLogo();
