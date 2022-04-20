const clock = document.querySelector(".clock");

let timeCount = 0;

const time = function () {
  let date = new Date();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();

  if (mm < 10) {
    mm = "0" + mm;
  }

  if (hh < 10) {
    hh = "0" + hh;
  }

  if (ss < 10) {
    ss = "0" + ss;
  }

  let timerString = hh + ":" + mm + ":" + ss;
  clock.textContent = timerString;
  timeCount = 1000;
};

setInterval(time, timeCount);
