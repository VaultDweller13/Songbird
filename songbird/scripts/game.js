import birdsData from './birds.js';
import AnswersList from './answers.js';
import MysteryBlock from './mystery.js';
import BirdInfo from './birdInfo.js';

export default class Game {
  constructor() {
    this.mainContent = document.querySelector('.content-wrapper_main');
    this.scoreBlocks = document.querySelectorAll('.score-value');
    this.resultsBlock = document.querySelector('.results');
    this.birdInfoBlock = document.querySelector('.bird-info');
    this.nextButton = document.querySelector('.button-next');
    this.restartButton = document.querySelector('.restart');
    this.currentCategory = 0;
    this.answersList = new AnswersList();
    this.mysteryBlock = new MysteryBlock();
    this.birdInfo = new BirdInfo();
    this.mysteryBird = null;
    this.currentQuestionScore = 5;
    this.score = 0;
    this.maxScore = birdsData.length * 5;
  }

  updateScore(score) {
    this.score += score;
    this.currentQuestionScore = 5;
    this.scoreBlocks.forEach(block => {
      block.textContent = this.score;
    });
  }

  setListener() {
    // Clicking on answer
    this.answersList.list.addEventListener('click', (e) => {
      const answer = e.target;
      const isAnswered = document.querySelector('.answer_correct');
      let highlightClass = 'answer_incorrect';

      if (answer.classList.contains('answer') && !isAnswered) {
        if (answer.textContent === this.mysteryBlock.mysteryBird.name) {
          highlightClass = 'answer_correct';
          this.updateScore(this.currentQuestionScore);

          this.nextButton.removeAttribute('disabled');
        } else if(!answer.classList.contains('answer_incorrect')) { 
          this.currentQuestionScore--;
        }

        answer.classList.add(highlightClass);
        this.birdInfo.populate(this.getPickedBird(answer.textContent));
        this.birdInfo.show();
      }
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
        this.birdInfo.hide();

      } else {
        this.toggleResult();
      }
    });

    // Clicking 'Try again button'
    this.restartButton.addEventListener('click', () => {
      this.toggleResult();
      this.init();
    })
  }

  getPickedBird(name) {
    const currentFamily = birdsData[this.currentCategory];

    return currentFamily.find(item => item.name === name);
  }

  toggleResult() {
    const maxScoreBlock = document.querySelector('.results__text_max');
    const baseScoreBlock = document.querySelector('.results__text_base');

    Array.from(this.mainContent.children).forEach(child => {
      child.classList.toggle('hidden');
    });

    if (this.score === this.maxScore) {
      maxScoreBlock.classList.toggle('hidden');
    } else {
      baseScoreBlock.classList.toggle('hidden');
    }
  }

  init() {
    this.score = 0;
    this.updateScore(0);
    this.currentCategory = 0;
    const data = birdsData[this.currentCategory];
    this.mysteryBlock.populate(data)
    this.answersList.init(data);
    this.birdInfo.hide();
  }

  start() {
    this.init()
    this.setListener();
  }
}