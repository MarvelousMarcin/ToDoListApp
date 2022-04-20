"use strict";

const loginWelcome = document.querySelector(".hello-text");
const logo = document.querySelector(".logo");
const loginButton = document.querySelector(".fi-rr-angle-right");
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

const textAnimation = (text) => {
  const letters = text.textContent;
  text.textContent = "";
  letters.split("").forEach((letter) => {
    const html = `<span class="textAnim hidden">${letter}</span>`;
    loginWelcome.insertAdjacentHTML("beforeend", html);
  });

  const lettersWithSpan = document.querySelectorAll(".textAnim");

  const timer = setInterval(onTick, 50);

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

  const response = await fetch("http://localhost:3000/userlogin", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const data = await response.json();
  console.log(data);
  if (response.ok) {
    location.href = `/mainpage/${data.name}`;
  } else {
  }
});

animateLogo();
textAnimation(loginWelcome);
