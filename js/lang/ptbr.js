const ptbr = {
    streamerbotconnected: 'Streamer.bot Online!',
    streamerbotdisconnected: 'Streamer.bot Disconnected!',


   tiktok : {
        follow : () => ` followed the channel`,
        sub : ({ months }) => ` subscribed for <i class="fa-solid fa-star"></i> <strong>${months || 1 } ${(months && months > 1) ? 'months' : 'month'}</strong>`,
        gift : ({ gift, count, coins }) => ` gifted <strong>${gift} x${count}</strong> (🪙 <strong>${coins} ${(coins && coins > 1) ? 'coins' : 'coin'})</strong>`,
        
    }
}