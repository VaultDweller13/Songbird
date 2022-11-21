export default class AudioPlayer {
  constructor(parent) {
    this.audio = new Audio();
    this.controlButton = parent.querySelector('.controls');
    this.progressBar = document.querySelector('progress-bar');
    this.durationBlock = parent.querySelector('.duration');
    this.currentTimeBlock = parent.querySelector('.current-time');

    this.audio.addEventListener('loadedmetadata', () => {
      this.durationBlock.textContent = this.audio.duration
    });

    this.controlButton.addEventListener('click', () => {
      this.togglePlay();
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
  
  init(src) {
    this.controlButton.setAttribute('src', './assets/images/play.svg');
    this.audio.src = src;
    this.currentTimeBlock.textContent = this.audio.currentTime;
  }
}