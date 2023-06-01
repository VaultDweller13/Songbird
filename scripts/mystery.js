import AudioPlayer from "./audioPlayer.js";

export default class MysteryBlock {
  constructor() {
    this.nameBlock = document.querySelector('.mystery-bird__name');
    this.image = document.querySelector('.mystery-bird__image');
  }

  getMysteryBird() {
    const num = Math.floor(Math.random() * this.data.length);
    console.log(`Верный ответ: ${this.data[num].name}`);
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
    const parent = document.querySelector('.mystery-bird__audio');
    if (!this.audioPlayer) this.audioPlayer = new AudioPlayer(parent);
    this.audioPlayer.init(this.mysteryBird.audio);
  }

  stopAudio() {
    this.audioPlayer.stop();
  }
}