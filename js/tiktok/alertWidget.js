const alertQueue = [];
let isShowing = false;

// URL Parameters
const params = new URLSearchParams(window.location.search);
const alertDuration = parseInt(params.get('duration')) || 5000;
const alertDurationSec = (alertDuration / 1000) + 's';

// Default sound (simple, reliable beep)
const defaultSoundURL = 'https://www.myinstants.com/media/sounds/kyahh-walter.mp3';
const soundURL = params.get('sound') || defaultSoundURL;
let isMuted = params.get('mute') === '1';

// Audio object
const alertSound = new Audio(soundURL);
alertSound.volume = 1; // adjust volume if needed

// Message listener
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
  } else if (lowerMsg.includes('subscribe')) {
    alert.classList.add('sub');
  } else if (lowerMsg.includes('share')) {
    alert.classList.add('share');
  } else {

    alert.classList.add('default');
  }

  alert.style.setProperty('--duration', alertDurationSec);

  alert.innerHTML = `
    <img src="${avatar}" alt="${userName}">
    <div class="text">
      <strong>${userName}</strong><br>${message}
    </div>
  `;

  const container = document.getElementById('alert-container');
  container.appendChild(alert);

  if (!isMuted) {
    alertSound.currentTime = 0;
    alertSound.play().catch(e => {
      console.warn('Alert sound play prevented:', e);
    });
  }

  setTimeout(() => {
    alert.remove();
    processQueue();
  }, alertDuration);
}
