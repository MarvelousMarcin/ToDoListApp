"use strict";

const logo = document.querySelector(".logo");
const logout = document.querySelector(".logout");
const pomodoro = document.querySelector(".pomodoro-func");
const startPomodoro = document.querySelector(".start-timer");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
const warning = document.querySelector(".warning");
const motivation = document.querySelector(".motivation");

const motivationMessages = [
  "Good Job!",
  "Keep working!",
  "You're doing great!",
  "Fantastic!",
  "Focus!",
];

let timeLeft = null;

class Counter {
  static start() {
    countDown();
    this._cDown = setInterval(countDown, 1000);
  }

  static stop() {
    clearInterval(this._cDown);
  }
}

const loadSession = async function () {
  const response = await fetch("http://localhost:3000/getSession");
  if (response.ok) {
    const result = await response.json();

    const date = result.date;
    const time = result.time;

    const finalTime = Date.parse(date) + time * 1000;
    const now = Date.now();

    timeLeft = Math.round((finalTime - now) / 1000);

    startPomodoro.textContent = "Reset";

    Counter.start();
  } else {
    minutes.focus();
    minutes.value = "60";
    seconds.value = "00";
  }
};

const countDown = async function (stop) {
  timeLeft--;

  if (timeLeft % 30 === 0) {
    const randomNumber = Math.trunc(Math.random() * motivationMessages.length);
    motivation.textContent = motivationMessages[randomNumber];
    motivation.style.display = "block";
    textAnimation(motivation, "basicClass", 150);
  } else if (timeLeft % 10 === 0) {
    motivation.textContent = "";
  }

  let minutesToShow = Math.floor(timeLeft / 60);
  if (minutesToShow < 10) minutesToShow = "0" + minutesToShow;
  let secondsToShow = timeLeft - 60 * Math.floor(timeLeft / 60);
  if (secondsToShow < 10) secondsToShow = "0" + secondsToShow;

  minutes.value = minutesToShow;
  seconds.value = secondsToShow;

  if (minutesToShow === "00" && secondsToShow === "00") {
    Counter.stop();

    await fetch("http://localhost:3000/deleteSession", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    await fetch("http://localhost:3000/finalsession", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
};

startPomodoro.addEventListener("click", async function () {
  if (this.textContent === "Reset") {
    motivation.textContent = "";
    this.textContent = "Start";
    await fetch("http://localhost:3000/finalsession", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        time: timeLeft,
      }),
    });

    await fetch("http://localhost:3000/deleteSession", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    Counter.stop();
    minutes.value = "60";
    seconds.value = "00";
    minutes.disabled = false;
    seconds.disabled = false;
    minutes.focus();
    return;
  }

  const minutesValue = Number(minutes.value);
  const secondsValue = Number(seconds.value);

  if (
    minutesValue < 0 ||
    secondsValue < 0 ||
    (minutesValue === 0 && secondsValue === 0)
  ) {
    return (warning.style.display = "block");
  }

  motivation.textContent = "";
  warning.style.display = "none";
  startPomodoro.textContent = "Reset";

  minutes.disabled = true;
  seconds.disabled = true;
  timeLeft = minutesValue * 60 + secondsValue;

  await fetch("http://localhost:3000/finalsession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: timeLeft,
      date: Date.now(),
    }),
  });

  await fetch("http://localhost:3000/addSession", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      time: timeLeft,
    }),
  });

  Counter.start();
});

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

loadSession();

animateLogo();
