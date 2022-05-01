"use strict";

const logo = document.querySelector(".logo");
const sessionsDiv = document.querySelector(".sessions");
const submenu = document.querySelector(".submenu");
const logout = document.querySelector(".logout");
const delButton = document.querySelector(".delete");
const subtitle = document.querySelector(".subtitle");

let sessions = [];
let currentSession = null;

class Session {
  constructor(_id, timeDur, date, title) {
    this._id = _id;
    this.timeDur = timeDur;
    this.date = new Date(date);
    this.title = title;
  }

  getTime() {
    const hou =
      this.date.getHours() < 10
        ? "0" + this.date.getHours()
        : this.date.getHours();
    const min =
      this.date.getMinutes() < 10
        ? "0" + this.date.getMinutes()
        : this.date.getMinutes();
    return `${hou}:${min}`;
  }

  getDuration() {
    if (this.timeDur < 60) {
      return `${this.timeDur} sec`;
    }

    const min = Math.trunc(this.timeDur / 60);
    const sec = this.timeDur - min * 60;
    return `${min} min  ${sec} sec`;
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
      if (submenu.style.transform === "scale(1)") {
        submenu.style.transform = "scale(0)";
      }
      currentSession = e.target.closest(".session");
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
  sessionsDiv.innerHTML = "";
  sessions.forEach((session) => {
    const html = `
    <div class="session inv" value="${session._id}">
      <input type="text" value="${
        session.title
      }" class="title sessText" disabled>
      <div class="duration sessText">${session.getDuration()}</div>
      <div class="date sessText">${session.getDate()} ${session.getTime()} </div>
    </div>
    `;
    sessionsDiv.insertAdjacentHTML("afterbegin", html);
  });

  let i = 0;
  let sessinLen = sessions.length;

  const sessionListDiv = document.querySelectorAll(".session");

  const showSess = setInterval(function () {
    sessionListDiv[i].style.opacity = "1";

    i++;
    console.log(i);
    if (i === sessinLen) {
      clear();
    }
  }, 200);

  function clear() {
    clearInterval(showSess);
  }

  addListenersToSessions();
};

const loadSessions = async () => {
  const response = await fetch("http://localhost:3000/finalsession");
  const data = await response.json();
  sessions = [];
  data.forEach((session) => {
    sessions.unshift(
      new Session(session._id, session.time, session.date, session.title)
    );
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

delButton.addEventListener("click", async function (e) {
  const _id = currentSession.getAttribute("value");
  await fetch("http://localhost:3000/session", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id }),
  });
  submenu.style.transform = "scale(0)";

  loadSessions();
});

logout.addEventListener("click", () => {
  document.cookie = "jwtToDoList=";
  location.href = "/";
});

subtitle.addEventListener("click", async function () {
  const _id = currentSession.getAttribute("value");
  const sessionsAll = document.querySelectorAll(".session");
  submenu.classList.toggle("dis");
  let getSessObj = null;
  sessionsAll.forEach((sess) => {
    sess.getAttribute("value") === _id ? (getSessObj = sess) : "";
  });
  const titleInput = getSessObj.querySelector(".title");
  titleInput.value = "";
  titleInput.disabled = false;
  titleInput.focus();
  submenu.style.transform = "scale(0)";
  titleInput.addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      submenu.classList.toggle("dis");
      titleInput.disabled = true;
      await fetch("http://localhost:3000/session", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, title: titleInput.value }),
      });
      element.removeEventListener("keypress");
    }
  });
});

loadSessions();
animateLogo();
