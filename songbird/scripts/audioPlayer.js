import { formatTime } from './utils.js';

export default class AudioPlayer {
  constructor(parent) {
    this.audio = new Audio();
    this.controlButton = parent.querySelector('.controls');
    this.progressBar = parent.querySelector('.progress-bar');
    this.progressBarFiller = parent.querySelector('.progress-bar__filler');
    this.durationBlock = parent.querySelector('.duration');
    this.currentTimeBlock = parent.querySelector('.current-time');

    this.audio.addEventListener('loadedmetadata', () => {
      this.durationBlock.textContent = formatTime(this.audio.duration);
    });

    this.controlButton.addEventListener('click', () => {
      this.togglePlay();
    });

    this.audio.addEventListener('ended', () => {
      this.controlButton.setAttribute('src', './assets/images/play.svg');
    });
  }

  togglePlay() {
    if (this.audio.paused) {
      this.controlButton.setAttribute('src', './assets/images/pause.svg');
      this.audio.play();
    } else {
      this.controlButton.setAttribute('src', './assets/images/play.svg');
      this.audio.pause();
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
    this.controlButton.setAttribute('src', './assets/images/play.svg');
  }

  updateProgress() {
    const time = Math.floor(this.audio.currentTime / this.audio.duration * 100);
    this.progressBarFiller.style.width = `${time}%`;
    this.currentTimeBlock.textContent = formatTime(this.audio.currentTime); 


    setTimeout(() => this.updateProgress(), 100);
  }
  
  init(src) {
    this.controlButton.setAttribute('src', './assets/images/play.svg');
    this.audio.src = src;
    this.currentTimeBlock.textContent = formatTime(this.audio.currentTime);
    this.updateProgress();
  }
}