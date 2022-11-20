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
    const audio = document.querySelector('.audio');

    if (!audio) {
      const audioBlock = document.querySelector('.audio-player');
      const player = new Audio(this.mysteryBird.audio);
      player.setAttribute('controls', '');
      player.classList.add('audio');
    
      audioBlock.append(player);
    } else audio.src = this.mysteryBird.audio;
  }
}