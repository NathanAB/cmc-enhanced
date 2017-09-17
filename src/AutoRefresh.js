const $ = require('./FakeQuery');

let refreshTimer;

function setTimerText(refreshElem, timerElem) {
  const seconds = parseInt(refreshElem.getAttribute('seconds'), 10) - 1;
  const minsRem = Math.floor(seconds / 60);

  let secondsFormatted = seconds % 60;
  secondsFormatted = secondsFormatted < 10 ? `0${secondsFormatted}` : secondsFormatted;
  timerElem.innerText = `${minsRem}:${secondsFormatted}`;
  refreshElem.setAttribute('seconds', seconds);
}

function resetTimer(mins) {
  return () => {
    clearTimeout(refreshTimer);
    const refreshElem = $('.auto-refresh');
    refreshElem.setAttribute('seconds', mins * 60);
    refreshTimer = setTimeout(() => {
      location.reload();
    }, mins * 60000);
  };
}

function setRefreshTimer(mins) {
  resetTimer(mins)();
  document.onmousemove = resetTimer(mins);
  document.onkeypress = resetTimer(mins);

  const refreshElem = $('.auto-refresh');
  const timerElem = $('.auto-refresh .time');
  setTimerText(refreshElem, timerElem);
  setInterval(() => {
    setTimerText(refreshElem, timerElem);
  }, 1000);
}

module.exports = {
  setRefreshTimer,
};
