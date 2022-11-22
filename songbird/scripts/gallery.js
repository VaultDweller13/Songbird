import { birdsDataEn, birdsDataRu } from "./birds.js";
import AudioPlayer from "./audioPlayer.js";

export default class Gallery {
    constructor(parent) {
        this.parent = parent
        this.lang = localStorage.getItem('songbird-lang');
        this.data = this.lang === 'en' ? birdsDataEn : birdsDataRu;
        this.birds = this.data.flat();
        this.index = 0;
        this.bird = this.birds[this.index];
    }

    setLanguage(lang) {
      this.lang = lang;
      this.data = this.lang === 'en' ? birdsDataEn : birdsDataRu;
      this.birds = this.data.flat();
      this.bird = this.birds[this.index];
      this.populate(this.bird);
    }

    init() {
      this.create()
      this.populate(this.bird);
    }

    create() {
      const imgContainer = document.createElement('div');
      imgContainer.classList.add('img-container');

      this.image = new Image();
      this.image.classList.add('gallery__image');

      this.prevButton = new Image(48, 48);
      this.prevButton.src = './assets/images/prev.svg';
      this.prevButton.classList.add('gallery__prev');

      this.nextButton = new Image(48, 48);
      this.nextButton.src = './assets/images/next.svg';
      this.nextButton.classList.add('gallery__next');

      imgContainer.append(this.prevButton, this.image, this.nextButton);
  
      this.name = document.createElement('p');
      this.name.classList.add('gallery__name');
      
      this.nameLatin = document.createElement('p');
      this.nameLatin.classList.add('gallery__name-latin');
     
      this.playerContainer = document.querySelector('.gallery__audio');
      this.player = new AudioPlayer(this.playerContainer);
  
      this.description = document.createElement('p');
      this.description.classList.add('gallery__description');
      
      this.parent.append(imgContainer, this.name, this.nameLatin, this.playerContainer, this.description);

      this.setListeners();
    }
  
    populate(bird) {
      this.bird = bird;
  
      this.image.src = this.bird.image;
      this.name.textContent = this.bird.name;
      this.nameLatin.textContent = this.bird.species;
      this.player.init(this.bird.audio);
      this.description.textContent = this.bird.description;
    }

    setListeners() {
      this.prevButton.addEventListener('click', () => {
        this.index = this.index > 0 ? this.index - 1 : this.birds.length - 1;
        this.populate(this.birds[this.index]);
      });
      this.nextButton.addEventListener('click', () => {
        this.index = this.index < this.birds.length - 1 ? this.index + 1 : 0;
        this.populate(this.birds[this.index]);
       });
    }
}