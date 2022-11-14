import birdsData from './birds.js';

function createAnswersList() {
  const answersBlock = document.querySelector('.answers-block');
  const listSize = birdsData[0].length;
  const list = document.createElement('ul');

  for(let i = 0; i < listSize; i++) {
    const item = document.createElement('li');
    item.classList.add(`answer`);
    list.append(item);
  }

  answersBlock.append(list);
}

function populateAnswersList(birdCategory) {
  const answersBlock = document.querySelector('.answers-block');
  const listItems = answersBlock.querySelectorAll('.answer');

  listItems.forEach((item, index) => item.textContent = birdCategory[index].name);
}

createAnswersList();
populateAnswersList(birdsData[0]);