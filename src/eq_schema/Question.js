const Answer = require("./Answer");
const { getInnerHTML, parseGuidance } = require("../utils/HTMLUtils");

class Question {
  constructor(question) {
    this.id = "question-" + question.id.toString();
    this.title = getInnerHTML(question.title);
    this.guidance = parseGuidance(question.guidance);
    this.type = "General";
    this.answers = this.buildAnswers(question.answers);
  }

  buildAnswers(answers) {
    return answers.map(answer => new Answer(answer));
  }
}

module.exports = Question;
