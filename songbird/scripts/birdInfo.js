export default class BirdInfo {
  constructor() {
    this.parent = document.querySelector('.bird-info');
    this.defaultText = document.querySelector('.bird-info__text-default');
    this.create();
  }

  create() {
    this.image = new Image();
    this.image.classList.add('bird-info__image', 'hidden');

    this.player = new Audio();
    this.player.classList.add('bird-info__audio', 'hidden');
    this.player.setAttribute('controls', '');

    this.description = document.createElement('p');
    this.description.classList.add('bird-info__description', 'hidden');
    
    this.parent.append(this.image, this.player, this.description);
  }

  populate(bird) {
    this.bird = bird;

    this.image.src = this.bird.image;
    this.player.src = this.bird.audio;
    this.description.textContent = this.bird.description;
  }

  show() {
    Array.from(this.parent.children).forEach(child => child.classList.remove('hidden'));
    this.defaultText.classList.add('hidden');
  }

  hide() {
    Array.from(this.parent.children).forEach(child => child.classList.add('hidden'));
    this.defaultText.classList.remove('hidden');
  }
}