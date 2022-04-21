"use strict";

const nameInput = document.querySelector(".nameInput");
const emailInput = document.querySelector(".emailInput");
const passwordInput = document.querySelector(".passwordInput");
const logo = document.querySelector(".logo");
const button = document.querySelector(".registerBut");

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

const readData = async function () {
  const name = nameInput.value;
  const password = passwordInput.value;
  const email = emailInput.value;
  const body = JSON.stringify({ name, password, email });
  const response = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  if (response.ok) {
    location.href = "/";
  } else {
  }
};

button.addEventListener("click", readData);
animateLogo();
