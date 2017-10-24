const Answer = require("./Answer");
const { getInnerHTML, parseGuidance } = require("../utils/HTMLUtils");
const { find } = require("lodash");

const findDateRange = question => find(question.answers, { type: "DateRange" });

class Question {
  constructor(question) {
    this.id = "question-" + question.id.toString();
    this.title = getInnerHTML(question.title);
    this.guidance = parseGuidance(question.guidance);

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
