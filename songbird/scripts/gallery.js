import { birdsDataEn, birdsDataRu } from "./birds.js";
import AudioPlayer from "./audioPlayer.js";

export default class Gallery {
    constructor(parent) {
        this.parent = parent
        this.lang = localStorage.getItem('songbird-lang');
        this.data = this.lang === 'en' ? birdsDataEn : birdsDataRu;
        this.firstItem = this.data[0][0];
    }

    setLanguage(lang) {
      this.lang = lang;
      this.init(lang);
    }

    init(lang) {
      this.create()
      this.populate(this.firstItem);
    }

    create() {
      this.image = new Image();
      this.image.classList.add('gallery__image');
  
      this.name = document.createElement('p');
      this.name.classList.add('gallery__name');
      
      this.nameLatin = document.createElement('p');
      this.nameLatin.classList.add('gallery__name-latin');
     
      this.playerContainer = document.querySelector('.gallery__audio');
      this.player = new AudioPlayer(this.playerContainer);
  
      this.description = document.createElement('p');
      this.description.classList.add('gallery__description');
      
      this.parent.append(this.image, this.name, this.nameLatin, this.playerContainer, this.description);
    }
  
    populate(bird) {
      this.bird = bird;
  
      this.image.src = this.bird.image;
      this.name.textContent = this.bird.name;
      this.nameLatin.textContent = this.bird.species;
      this.player.init(this.bird.audio);
      this.description.textContent = this.bird.description;
    }
}