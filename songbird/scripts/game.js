import birdsData from './birds.js';
import AnswersList from './answers.js';
import MysteryBlock from './mystery.js';
import BirdInfo from './birdInfo.js';

export default class Game {
  constructor() {
    this.startPage = document.querySelector('.content-wrapper_start-page');
    this.topPanel = document.querySelector('.content-wrapper_top-panel');
    this.mainContent = document.querySelector('.content-wrapper_main');
    this.scoreBlocks = document.querySelectorAll('.score-value');
    this.maxScoreBlock = document.querySelector('.score-max');
    this.resultsBlock = document.querySelector('.content-wrapper_results');
    this.birdInfoBlock = document.querySelector('.bird-info');
    this.mysteryBirdBlock = document.querySelector('.mystery-bird')
    this.answersListBlock = document.querySelector('.answers-block')
    this.birdTypes = document.querySelectorAll('.bird-types__item');
    this.nextButton = document.querySelector('.button-next');
    this.startButton = document.querySelector('.button-start');
    this.restartButton = document.querySelector('.button-restart');
    this.navStartButton = document.querySelector('.nav__start');
    this.navQuizButton = document.querySelector('.nav__quiz');
    this.currentCategory = 0;
    this.answersList = new AnswersList();
    this.mysteryBlock = new MysteryBlock();
    this.birdInfo = new BirdInfo();
    this.mysteryBird = null;
    this.currentQuestionScore = 5;
    this.score = 0;
    this.maxScore = birdsData.length * 5;
    this.correctSound = new Audio('./assets/sounds/correct.wav');
    this.wrongSound = new Audio('./assets/sounds/wrong.wav');
  }

  updateScore(score) {
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
      this.birdInfo.populate(this.getPickedBird(answer.textContent));
      this.birdInfo.show();
    });

    // Clicking 'Next' button
    this.nextButton.addEventListener('click', () => {
      const notLastCategory = this.currentCategory < birdsData.length - 1;

      if (notLastCategory) {
        this.currentCategory++;
        
        const data = birdsData[this.currentCategory];

        this.answersList.init(data);
        this.mysteryBlock.populate(data);
        this.nextButton.setAttribute('disabled', '');
        this.nextButton.classList.remove('button-next_active');
        this.higlightCurrentCategory();

      } else {
        this.toggleResult();
      }

      this.birdInfo.hide();
    });

    // Clicking 'Try again button'
    this.restartButton.addEventListener('click', () => {
      this.toggleResult();
      this.init();
    });
  }

  getPickedBird(name) {
    const currentFamily = birdsData[this.currentCategory];

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
  }

  showQuizPage() {
    this.topPanel.classList.remove('hidden');
    this.mainContent.classList.remove('hidden');
    this.startPage.classList.add('hidden');
    this.resultsBlock.classList.add('hidden');
  }

  higlightCurrentCategory() {
    this.birdTypes.forEach(type => type.classList.remove('active'));
    this.birdTypes[this.currentCategory].classList.add('active');
  }

  init() {
    this.score = 0;
    this.updateScore(0);
    this.currentCategory = 0;
    const data = birdsData[this.currentCategory];
    this.mysteryBlock.populate(data)
    this.answersList.init(data);
    this.birdInfo.hide();
    this.nextButton.setAttribute('disabled', '');
    this.nextButton.classList.remove('button-next_active');
    this.higlightCurrentCategory();
  }

  start() {
    this.init()
    this.setListener();
  }
}