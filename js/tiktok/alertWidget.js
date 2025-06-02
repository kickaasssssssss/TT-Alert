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

// Event toggles (default to 1 if not set)
const eventToggles = {
  follow: params.get('follow') !== '0',
  gift: params.get('gift') !== '0',
  share: params.get('share') !== '0',
  subscribe: params.get('subscribe') !== '0',
};

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

  // Determine alert type
  let alertType = 'default';
  if (lowerMsg.includes('follow')) alertType = 'follow';
  else if (lowerMsg.includes('gift')) alertType = 'gift';
  else if (lowerMsg.includes('subscribe')) alertType = 'subscribe';
  else if (lowerMsg.includes('share')) alertType = 'share';

  // Check if this alert type is enabled
  if (!eventToggles[alertType]) {
    processQueue(); // skip this alert and go to the next
    return;
  }

  const alert = document.createElement('div');
  alert.classList.add('alert', alertType);
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
