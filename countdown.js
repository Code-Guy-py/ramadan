// ⚠️ Set Ramadan start date (adjust if needed)
const ramadanDate = new Date("2026-02-16T00:00:00");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date();
  const diff = ramadanDate - now;

  // 🔓 Unlock website when Ramadan starts
  if (diff <= 0) {
    window.location.href = "index.html";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor(diff / 1000 % 60);

  daysEl.textContent = days;
  hoursEl.textContent = hours;
  minutesEl.textContent = minutes;
  secondsEl.textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);
