import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

player.on('timeupdate', throttle(savedTime, 1000));

function savedTime(evt) {
  const time = evt.seconds;

  localStorage.setItem('videoplayer-current-time', time);
}

const getTimeSum = localStorage.getItem('videoplayer-current-time');
if (getTimeSum !== null) {
  player.setCurrentTime(getTimeSum);
}
