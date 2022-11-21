export default class MysteryBlock {
  constructor() {
    this.nameBlock = document.querySelector('.mystery-bird__name');
    this.image = document.querySelector('.mystery-bird__image');
  }

  getMysteryBird() {
    const num = Math.floor(Math.random() * this.data.length);
    return this.data[num];
  }

  populate(data) {
    this.data = data;

    this.image.src = './assets/images/mystery-bird.jpg';
    this.mysteryBird = this.getMysteryBird();
    this.nameBlock.textContent = '***';
    this.createAudioPlayer();
  }

  showName() {
    this.nameBlock.textContent = this.mysteryBird.name;
    this.image.src = this.mysteryBird.image;
  }

  createAudioPlayer() {
    this.audio = document.querySelector('.audio');

    if (!this.audio) {
      const audioBlock = document.querySelector('.audio-player');
      this.audio = new Audio(this.mysteryBird.audio);
      this.audio.setAttribute('controls', '');
      this.audio.classList.add('audio');
    
      audioBlock.append(this.audio);
    } else this.audio.src = this.mysteryBird.audio;
  }

  stopAudio() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}