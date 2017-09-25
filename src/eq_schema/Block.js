const Question = require("./Question");

const get = require("lodash").get;

class Block {
  constructor(page) {
    this.id = "block-" + page.id.toString();
    this.title = page.title;
    this.description = page.description;
    this.type = this.convertPageType(page.pageType);
    this.questions = this.buildQuestions(page);
  }

  buildQuestions(page) {
    return [new Question(page)];
  }

  convertPageType(type) {
    const mappings = {
      QuestionPage: "Questionnaire",
      InterstitialPage: "Interstitial"
    };

    return get(mappings, type, type);
  }
}

module.exports = Block;
