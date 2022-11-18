export default class AnswersList {
  constructor() {
    this.parent = document.querySelector('.answers-block');
  }

  create() {
    if (this.list) return;

    this.list = document.createElement('ul');
    this.list.classList.add('list_unmarked');

    for(let i = 0; i < this.size; i++) {
      const item = document.createElement('li');
      item.classList.add(`answer`);
      this.list.append(item);
    }
    
    this.parent.append(this.list);
  }

  populate() {
    const listItems = this.parent.querySelectorAll('.answer');
    listItems.forEach((item, index) => item.textContent = this.data[index].name);
  }

  clearStyles() {
    const styles = ['answer_correct', 'answer_incorrect']
    const answers = this.parent.querySelectorAll('.answer');
    answers.forEach(answer => answer.classList.remove(...styles));
  }

  init(data) {
    this.data = data;
    this.size = data.length;

    this.create();
    this.clearStyles();
    this.populate();
  }
}