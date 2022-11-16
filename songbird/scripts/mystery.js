export default class MysteryBlock {
  constructor() {
    this.nameBlock = document.querySelector('.mystery-bird__name');
  }

  getMysteryBird() {
    const num = Math.floor(Math.random() * this.data.length);
    return this.data[num];
  }

  populate(data) {
    this.data = data;

    this.mysteryBird = this.getMysteryBird();
    this.nameBlock.textContent = this.mysteryBird.name;
    this.createAudioPlayer();
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