import birdsData from './birds.js';

export default class Game {
  constructor() {
    this.answersBlock = document.querySelector('.answers-block');
    this.nameBlock = document.querySelector('.mystery-bird__name');
    this.currentCategory = birdsData[0];
  }

  createAnswersList() {
    const listSize = birdsData[0].length;
    const list = document.createElement('ul');
  
    for(let i = 0; i < listSize; i++) {
      const item = document.createElement('li');
      item.classList.add(`answer`);
      list.append(item);
    }
  
    this.answersBlock.append(list);
  }
  
  populateAnswersList(birdCategory) {
    const listItems = this.answersBlock.querySelectorAll('.answer');
  
    listItems.forEach((item, index) => item.textContent = birdCategory[index].name);
  }
  
  getMysteryBird(birdCategory) {
    const num = Math.floor(Math.random() * birdCategory.length);
    return birdCategory[num];
  }
  
  populateMysteryBlock(birdCategory) {
    const mysteryBird = this.getMysteryBird(birdCategory);
    this.nameBlock.textContent = mysteryBird.name;
    this.createAudioPlayer(mysteryBird);
  }
  
  createAudioPlayer(bird) {
    const audioBlock = document.querySelector('.audio-player');
    const player = new Audio(bird.audio);
    player.setAttribute('controls', '');
  
    audioBlock.append(player);
  }
  
  start() {
    this.createAnswersList();
    this.populateMysteryBlock(this.currentCategory)
    this.populateAnswersList(this.currentCategory);
  }
}