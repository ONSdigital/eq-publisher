const Question = require("./Question");
const { get } = require("lodash");
const { getInnerHTML } = require("../utils/HTMLUtils");

const pageTypeMappings = {
  QuestionPage: "Questionnaire",
  InterstitialPage: "Interstitial"
};

class Block {
  constructor(title, description, page) {
    this.id = "block-" + page.id.toString();
    this.title = getInnerHTML(title);
    this.description = getInnerHTML(description);
    this.type = this.convertPageType(page.pageType);
    this.questions = this.buildQuestions(page);
  }

  buildQuestions(page) {
    return [new Question(page)];
  }

  convertPageType(type) {
    return get(pageTypeMappings, type, type);
  }
}

module.exports = Block;
