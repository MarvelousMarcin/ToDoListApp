"use strict";

const logo = document.querySelector(".logo");
const sessionsDiv = document.querySelector(".sessions");
const submenu = document.querySelector(".submenu");
const sessions = [];

class Session {
  constructor(_id, timeDur, date) {
    this._id = _id;
    this.timeDur = timeDur;
    this.date = new Date(date);
  }

  getTime() {
    const hou = this.date.getHours();
    const min = this.date.getMinutes();
    return `${hou}:${min}`;
  }

  getDuration() {
    if (this.timeDur < 60) {
      return `${this.timeDur}sec`;
    }

    const min = Math.trunc(this.timeDur / 60);
    const sec = this.timeDur - min * 60;
    return `${min}min ${sec}sec`;
  }

  getDate() {
    const day =
      this.date.getDay() < 10 ? "0" + this.date.getDay() : this.date.getDay();
    const month =
      this.date.getMonth() < 10
        ? "0" + this.date.getMonth()
        : this.date.getMonth();
    const year = this.date.getFullYear();

    return `${day}-${month}-${year}`;
  }
}

const addListenersToSessions = () => {
  const sessionListDiv = document.querySelectorAll(".session");
  sessionListDiv.forEach((session) => {
    session.addEventListener("click", function (e) {
      console.log(submenu.style.transform);

      if (submenu.style.transform === "scale(1)") {
        submenu.style.transform = "scale(0)";
      }
      const x = e.x;
      const y = e.y;
      submenu.style.top = `${y}px`;
      submenu.style.left = `${x}px`;
      submenu.style.transform = "scale(1)";
    });
  });
};

document.addEventListener("click", (e) => {
  const sessionListDiv = document.querySelectorAll(".session");
  let isDiv = false;
  sessionListDiv.forEach(function (sess) {
    if (sess.contains(e.target) || submenu.contains(e.target)) {
      isDiv = true;
      return;
    }
  });

  if (!isDiv) {
    submenu.style.transform = "scale(0)";
  }
});

const generateSessions = async () => {
  sessions.forEach((session) => {
    const html = `
    <div class="session">
      <div class="title sessText">Session</div>
      <div class="duration sessText">${session.getDuration()}</div>
      <div class="date sessText">${session.getDate()} ${session.getTime()} </div>
    </div>
    `;
    sessionsDiv.insertAdjacentHTML("afterbegin", html);
  });
  addListenersToSessions();
};

const loadSessions = async () => {
  const response = await fetch("http://localhost:3000/finalsession");
  const data = await response.json();
  data.forEach((session) => {
    sessions.unshift(new Session(session._id, session.time, session.date));
  });

  generateSessions();
};

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

loadSessions();
animateLogo();
