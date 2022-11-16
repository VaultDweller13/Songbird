import birdsData from './birds.js';
import AnswersList from './answers.js';
import MysteryBlock from './mystery.js';

export default class Game {
  constructor() {
    this.scoreBlock = document.querySelector('.score-value');
    this.nextButton = document.querySelector('.button-next');
    this.currentCategory = 0;
    this.answersList = new AnswersList();
    this.mysteryBlock = new MysteryBlock();
    this.mysteryBird = null;
    this.currentQuestionScore = 5;
    this.score = 0;
  }

  updateScore(score) {
    this.score += score;
    this.currentQuestionScore = 5;
    this.scoreBlock.textContent = this.score;
  }

  setListener() {
    this.answersList.list.addEventListener('click', (e) => {
      const answer = e.target;
      let highlightClass = 'answer_incorrect';

      if (answer.classList.contains('answer')) {
        if (answer.textContent === this.mysteryBlock.mysteryBird.name) {
          highlightClass = 'answer_correct';
          this.updateScore(this.currentQuestionScore);

          if (this.currentCategory < birdsData.length - 1) this.nextButton.removeAttribute('disabled');
        } else this.currentQuestionScore--;

        answer.classList.add(highlightClass)
      }
    });

    this.nextButton.addEventListener('click', () => {
      this.currentCategory++;
      
      const data = birdsData[this.currentCategory];
      this.answersList.init(data);
      this.answersList.clearStyles();
      this.mysteryBlock.populate(data);
      this.nextButton.setAttribute('disabled', '');
    });
  }

  start() {
    const data = birdsData[this.currentCategory];
    this.mysteryBlock.populate(data)
    this.answersList.init(data);
    this.setListener();
  }
}