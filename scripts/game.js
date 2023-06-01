import { birdsDataEn, birdsDataRu } from './birds.js';
import AnswersList from './answers.js';
import MysteryBlock from './mystery.js';
import BirdInfo from './birdInfo.js';
import { en, ru } from './lang.js';
import Gallery from './gallery.js';

export default class Game {
  constructor() {
    this.startPage = document.querySelector('.content-wrapper_start-page');
    this.heading = document.querySelector('.heading');
    this.topPanel = document.querySelector('.content-wrapper_top-panel');
    this.mainContent = document.querySelector('.content-wrapper_main');
    this.scoreBlocks = document.querySelectorAll('.score-value');
    this.maxScoreBlock = document.querySelector('.score-max');
    this.resultsBlock = document.querySelector('.content-wrapper_results');
    this.birdInfoBlock = document.querySelector('.bird-info');
    this.birdInfoDefaultText = document.querySelector('.bird-info__text-default');
    this.mysteryBirdBlock = document.querySelector('.mystery-bird')
    this.answersListBlock = document.querySelector('.answers-block')
    this.birdTypes = document.querySelectorAll('.bird-types__item');
    this.nextButton = document.querySelector('.button-next');
    this.startButton = document.querySelector('.button-start');
    this.restartButton = document.querySelector('.button-restart');
    this.navStartButton = document.querySelector('.nav__start');
    this.navQuizButton = document.querySelector('.nav__quiz');
    this.navGalleryButton = document.querySelector('.nav__gallery');
    this.resultsTextBase = document.querySelector('.results__text_base');
    this.resultsTextMax = document.querySelector('.results__text_max');
    this.langButton = document.querySelector('.nav__language');
    this.galleryPage = document.querySelector('.content-wrapper_gallery');
    this.currentCategory = 0;
    this.answersList = new AnswersList();
    this.mysteryBlock = new MysteryBlock();
    this.birdInfo = new BirdInfo();
    this.gallery = new Gallery(this.galleryPage);
    this.mysteryBird = null;
    this.currentQuestionScore = 5;
    this.score = 0;
    this.correctSound = new Audio('./assets/sounds/correct.wav');
    this.wrongSound = new Audio('./assets/sounds/wrong.wav');
    this.lang = localStorage.getItem('songbird-lang') || 'ru';
    this.gallery.init();
    this.setLanguage(this.lang);
    this.maxScore = this.birdsData.length * 5;

  }

  updateScore(score) {
    this.scoreBlocks = document.querySelectorAll('.score-value');
    this.maxScoreBlock = document.querySelector('.score-max');

    this.score += score;
    this.currentQuestionScore = 5;
    this.maxScoreBlock.textContent = this.maxScore;
    this.scoreBlocks.forEach(block => {
      block.textContent = this.score;
    });
  }

  setListener() {
    // Clicking 'Quiz page' nav button
    this.navQuizButton.addEventListener('click', () => this.showQuizPage());

    // Clicking 'Start page' nav button
    this.navStartButton.addEventListener('click', () => this.showStartPage());

    // Clicking 'Start' button 
    this.startButton.addEventListener('click', () => {
      this.init();
      this.showQuizPage();
    });

    // Clicking on answer
    this.answersList.list.addEventListener('click', (e) => {
      const answer = e.target;
      const isAnswered = document.querySelector('.answer_correct');
      let highlightClass = 'answer_incorrect';

      if (answer.classList.contains('answer') && !isAnswered) {
        if (answer.textContent === this.mysteryBlock.mysteryBird.name) {
          this.mysteryBlock.stopAudio();
          this.correctSound.play();
          this.mysteryBlock.showName();
          highlightClass = 'answer_correct';
          this.updateScore(this.currentQuestionScore);

          this.nextButton.removeAttribute('disabled');
          this.nextButton.classList.add('button-next_active');

        } else if(!answer.classList.contains('answer_incorrect')) { 
          this.wrongSound.currentTime = 0;
          this.wrongSound.play();
          this.currentQuestionScore--;
        }

        answer.classList.add(highlightClass);
      }
      this.pickedBird = this.getPickedBird(answer.textContent);
      this.birdInfo.populate(this.pickedBird);
      this.birdInfo.show();
    });

    // Clicking 'Next' button
    this.nextButton.addEventListener('click', () => {
      const notLastCategory = this.currentCategory < this.birdsData.length - 1;

      if (notLastCategory) {
        this.currentCategory++;
        
        const data = this.birdsData[this.currentCategory];

        this.answersList.init(data);
        this.mysteryBlock.populate(data);
        this.nextButton.setAttribute('disabled', '');
        this.nextButton.classList.remove('button-next_active');
        this.higlightCurrentCategory();

      } else {
        this.toggleResult();
      }

      this.birdInfo.hide();
      this.birdInfo.player.stop();
    });

    // Clicking 'Try again button'
    this.restartButton.addEventListener('click', () => {
      this.toggleResult();
      this.init();
    });

    // Clicking 'language' nav button 
    this.langButton.addEventListener('click', () => {
      this.lang = this.langButton.textContent.toLowerCase() === 'en' ? 'ru' : 'en';
      this.langButton.textContent = this.lang.toUpperCase();
      this.setLanguage(this.lang);
    })

    // Clicking 'Gallery' nav button
    this.navGalleryButton.addEventListener('click', () => {
      this.showGalleryPage();
    });
  }

  getPickedBird(name) {
    const currentFamily = this.birdsData[this.currentCategory];

    return currentFamily.find(item => item.name === name);
  }

  toggleResult() {
    const maxScoreBlock = document.querySelector('.results__text_max');
    const baseScoreBlock = document.querySelector('.results__text_base');

    this.mainContent.classList.toggle('hidden');
    this.resultsBlock.classList.toggle('hidden');

    if (this.score === this.maxScore) {
      maxScoreBlock.classList.toggle('hidden');
    } else {
      baseScoreBlock.classList.toggle('hidden');
    }
  }

  showStartPage() {
    this.topPanel.classList.add('hidden');
    this.mainContent.classList.add('hidden');
    this.startPage.classList.remove('hidden');
    this.resultsBlock.classList.add('hidden');
    this.galleryPage.classList.add('hidden');

  }

  showGalleryPage() {
    this.topPanel.classList.add('hidden');
    this.mainContent.classList.add('hidden');
    this.startPage.classList.add('hidden');
    this.resultsBlock.classList.add('hidden');
    this.galleryPage.classList.remove('hidden');
  }

  showQuizPage() {
    this.topPanel.classList.remove('hidden');
    this.mainContent.classList.remove('hidden');
    this.startPage.classList.add('hidden');
    this.resultsBlock.classList.add('hidden');
    this.galleryPage.classList.add('hidden');
  }

  higlightCurrentCategory() {
    this.birdTypes.forEach(type => type.classList.remove('active'));
    this.birdTypes[this.currentCategory].classList.add('active');
  }

  init() {
    this.score = 0;
    this.updateScore(0);
    this.currentCategory = 0;
    const data = this.birdsData[this.currentCategory];
    this.mysteryBlock.populate(data)
    this.answersList.init(data);
    this.birdInfo.hide();
    this.nextButton.setAttribute('disabled', '');
    this.nextButton.classList.remove('button-next_active');
    this.higlightCurrentCategory();
  }

  start() {
    this.setLanguage(this.lang);
    this.init()
    this.setListener();
  }

  setLanguage(language) {
    if (language) this.langButton.textContent = language.toUpperCase();

    this.birdsData = language === 'en' ? birdsDataEn : birdsDataRu;
    const lang = language === 'en' ? en : ru;
    this.navStartButton.textContent = lang.navStart;
    this.navQuizButton.textContent = lang.navQuiz;
    this.heading.textContent = lang.heading;
    this.startButton.textContent = lang.buttonStart;
    this.navGalleryButton.textContent = lang.buttonGallery;
    this.birdInfoDefaultText.textContent = lang.birdInfoDefault;
    this.nextButton.textContent = lang.buttonNext;
    this.resultsTextMax.textContent = lang.maxScore;
    this.resultsTextBase.innerHTML = lang.baseScore;
    this.restartButton.textContent = lang.buttonRestart;
    this.birdTypes.forEach((type, index) => type.textContent = lang.categories[index]);
    if (this.pickedBird) this.birdInfo.populate(this.birdsData[this.currentCategory][this.pickedBird.id - 1]);
    if (this.mysteryBlock.mysteryBird) {
      this.mysteryBlock.mysteryBird = this.birdsData[this.currentCategory][this.mysteryBlock.mysteryBird.id - 1];
      if (this.mysteryBlock.nameBlock.textContent !== '***') this.mysteryBlock.showName();
    }
    const answers = document.querySelectorAll('.answer');
    answers.forEach((answer, index) => answer.textContent = this.birdsData[this.currentCategory][index].name);

    this.gallery.setLanguage(this.lang);
    localStorage.setItem('songbird-lang', language);
  }
}