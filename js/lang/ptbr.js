// Parse URL params helper
function getUrlParams() {
  const params = {};
  window.location.search.substring(1).split("&").forEach(param => {
    const [key, value] = param.split("=");
    if (key) params[key] = decodeURIComponent(value || "");
  });
  return params;
}

const urlParams = getUrlParams();

const ptbr = {
  streamerbotconnected: 'Streamer.bot Online!',
  streamerbotdisconnected: 'Streamer.bot Disconnected!',

  // Override texts if present in URL
  tiktok: {
    follow: () => `${urlParams.followText || 'followed the channel'}`,
    sub: ({ months }) => `${urlParams.subText || 'subscribed for'} <i class="fa-solid fa-star"></i> <strong>${months || 1} ${(months && months > 1) ? 'months' : 'month'}</strong>`,
    gift: ({ gift, count, coins }) => `${urlParams.giftText || 'gifted'} <strong>${gift} x${count}</strong> (🪙 <strong>${coins} ${(coins && coins > 1) ? 'coins' : 'coin'})</strong>`,
  }
};
