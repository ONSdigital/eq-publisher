const Question = require("./Question");
const { get } = require("lodash");
const { getInnerHTML } = require("../utils/HTMLUtils");
const convertPipes = require("../utils/convertPipes");

const pageTypeMappings = {
  QuestionPage: "Questionnaire",
  InterstitialPage: "Interstitial"
};

class Block {
  constructor(title, page) {
    this.id = "block-" + page.id.toString();
    this.title = getInnerHTML(title);
    this.description = getInnerHTML(convertPipes(page.description));
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
