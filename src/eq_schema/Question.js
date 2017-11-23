const Answer = require("./Answer");
const { getInnerHTML, parseGuidance } = require("../utils/HTMLUtils");
const { find, get, flow } = require("lodash/fp");
const convertPipes = require("../utils/convertPipes");

const findDateRange = flow(get("answers"), find({ type: "DateRange" }));

const processPipedText = flow(convertPipes, getInnerHTML);
const processGuidance = flow(convertPipes, parseGuidance);

class Question {
  constructor(question) {
    this.id = "question-" + question.id;
    this.title = processPipedText(question.title);
    this.guidance = processGuidance(question.guidance);
    this.description = processPipedText(question.description);

    const dateRange = findDateRange(question);

    if (dateRange) {
      this.type = "DateRange";
      this.answers = this.buildDateRangeAnswers(dateRange);
    } else {
      this.type = "General";
      this.answers = this.buildAnswers(question.answers);
    }
  }

  buildAnswers(answers) {
    return answers.map(answer => new Answer(answer));
  }

  buildDateRangeAnswers({ id }) {
    return [
      new Answer({
        label: "Period from",
        type: "Date",
        id: `${id}-from`,
        mandatory: true
      }),
      new Answer({
        label: "Period to",
        type: "Date",
        id: `${id}-to`,
        mandatory: true
      })
    ];
  }
}

module.exports = Question;
