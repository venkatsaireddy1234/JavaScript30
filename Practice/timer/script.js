class Timer {
  constructor(minMSB, minLSB, secMSB, secLSB, start, stop, reset, display) {
    this.minMSB = document.getElementById(minMSB);
    this.minLSB = document.getElementById(minLSB);
    this.secLSB = document.getElementById(secLSB);
    this.secMSB = document.getElementById(secMSB);
    this.start = document.getElementById(start);
    this.stop = document.getElementById(stop);
    this.reset = document.getElementById(reset);
    this.display = document.getElementById(display);

    this.minutes = 0;
    this.secs = 0;
    this.intervalId = null;
    this.bindEvents();
  }
  bindEvents() {
    this.start.addEventListener("click", () => {
      this.onStart();
    });
    this.stop.addEventListener("click", () => {
      this.onStop();
    });
    this.reset.addEventListener("click", () => {
      this.onReset();
    });
    this.display.addEventListener("input", (e) => {
      this.onInput(e);
    });
  }
  onStart() {
    this.setTime();
    this.startTimer();
    this.display.classList.add("progress");
    this.setControls(true, false);
    this.setAllInputsDisabled(true);
  }
  setTime() {
    this.minutes =
      parseInt(this.minMSB.value) * 10 + parseInt(this.minLSB.value);
    this.secs = parseInt(this.secMSB.value) * 10 + parseInt(this.secLSB.value);
  }
  startTimer() {
    if (this.minutes === 0 && this.secs === 0) {
      this.onReset();
      return;
    }
    this.intervalId = setInterval(() => {
      this.secs -= 1;
      if (this.secs < 0) {
        this.secs = 59;
        this.minutes -= 1;
      }
      if (this.minutes === 0 && this.secs === 0) {
        this.onReset();
      }
      this.setDisplay(this.minutes, this.secs);
    }, 1000);
  }
  onReset() {
    this.resetTimer();
    this.resetControls();
  }

  resetTimer() {
    this.minMSB.value = 0;
    this.minLSB.value = 0;
    this.secLSB.value = 0;
    this.secMSB.value = 0;
  }

  resetControls() {
    clearInterval(this.intervalId);
    this.display.classList.remove("progress");
    this.setAllInputsDisabled(false);
  }

  setDisplay(mins, secs) {
    this.minMSB.value = String(Math.floor(mins / 10));
    this.minLSB.value = String(mins % 10);
    this.secMSB.value = String(Math.floor(secs / 10));
    this.secLSB.value = String(secs % 10);
  }
  onStop() {
    clearInterval(this.intervalId);
    this.setControls(false, true);
    this.setAllInputsDisabled(false);
  }
  setControls(startStatus = false, stopStatus = false) {
    this.start.disabled = startStatus;
    this.stop.disabled = stopStatus;
  }
  setAllInputsDisabled(isDisabled = false) {
    this.minLSB.disabled = isDisabled;
    this.minMSB.disabled = isDisabled;
    this.secLSB.disabled = isDisabled;
    this.secMSB.disabled = isDisabled;
  }
  setControls(startStatus = false, stopStatus = false) {
    this.start.disabled = startStatus;
    this.stop.disabled = stopStatus;
  }

  onInput(e) {}
}

new Timer(
  "minMSB",
  "minLSB",
  "secMSB",
  "secLSB",
  "start",
  "stop",
  "reset",
  "display"
);
