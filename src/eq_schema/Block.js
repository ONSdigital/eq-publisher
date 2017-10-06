const Question = require("./Question");
const { get } = require("lodash");
const { getInnerHTML } = require("../utils/HTMLUtils");

class Block {
  constructor(page) {
    this.id = "block-" + page.id.toString();
    this.title = getInnerHTML(page.title);
    this.description = getInnerHTML(page.description);
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
