"use strict";

const loginWelcome = document.querySelector(".hello-text");
const logo = document.querySelector(".logo");
const loginButton = document.querySelector(".fi-sr-play");
const emailInput = document.querySelector("#textInput");
const passwordInput = document.querySelector("#passwordInput");

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

const textAnimation = (text, color, speed) => {
  const letters = text.textContent;
  text.textContent = "";
  letters.split("").forEach((letter) => {
    const html = `<span class="${color} hidden">${letter}</span>`;
    loginWelcome.insertAdjacentHTML("beforeend", html);
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

loginButton.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  const body = JSON.stringify({
    email,
    password,
  });

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (response.ok) {
    document.cookie = `jwtToDoList=${data}`;
    location.href = "/mainPage";
  } else {
    emailInput.value = "";
    passwordInput.value = "";

    loginWelcome.textContent = "You made a mistake?";
    loginWelcome.style.color = "red";
    textAnimation(loginWelcome, "wrongText", 40);
  }
});

emailInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    passwordInput.focus();
  }
});

passwordInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    loginButton.click();
  }
});

animateLogo();
textAnimation(loginWelcome, "textAnim", 90);
