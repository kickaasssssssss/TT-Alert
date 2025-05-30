const alertQueue = [];
let isShowing = false;

// Get URL parameters
const params = new URLSearchParams(window.location.search);
const alertDuration = parseInt(params.get('duration')) || 5000; // in milliseconds
const alertDurationSec = (alertDuration / 1000) + 's'; // convert to seconds for CSS

window.addEventListener('message', (event) => {
  if (event.data.type === 'tiktok-alert') {
    alertQueue.push(event.data.data);
    if (!isShowing) processQueue();
  }
});

function processQueue() {
  if (alertQueue.length === 0) {
    isShowing = false;
    return;
  }

  isShowing = true;
  const { avatar, userName, message } = alertQueue.shift();
  const lowerMsg = message.toLowerCase();

  const alert = document.createElement('div');
  alert.classList.add('alert');

  if (lowerMsg.includes('follow')) {
    alert.classList.add('follow');
  } else if (lowerMsg.includes('gift')) {
    alert.classList.add('gift');
  } else if (lowerMsg.includes('subscrib')) {
    alert.classList.add('sub');
  } else {
    alert.classList.add('default');
  }

  // Set dynamic duration for the animation
  alert.style.setProperty('--duration', alertDurationSec);

  alert.innerHTML = `
    <img src="${avatar}" alt="${userName}">
    <div class="text">
      <strong>${userName}</strong><br>${message}
    </div>
  `;

  const container = document.getElementById('alert-container');
  container.appendChild(alert);

  // Wait for the alert duration, then remove and show next
  setTimeout(() => {
    alert.remove();
    processQueue();
  }, alertDuration);
}

function clearAlerts() {
  alertQueue.length = 0;
  document.getElementById('alert-container').innerHTML = '';
  isShowing = false;
}
