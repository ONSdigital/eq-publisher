const Answer = require("./Answer");
const { getInnerHTML, parseGuidance } = require("../utils/HTMLUtils");
const { find, get, flow, flatten } = require("lodash/fp");
const convertPipes = require("../utils/convertPipes");

const findDateRange = flow(get("answers"), find({ type: "DateRange" }));

const processPipedText = flow(convertPipes, getInnerHTML);
const processGuidance = flow(convertPipes, parseGuidance);
const { isNil } = require("lodash");

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
    const answerArray = flatten(
      answers.map(answer => {
        if (!isNil(answer.other)) {
          return [
            answer,
            Answer.buildChildAnswer(answer.other.answer, answer.id)
          ];
        }
        return answer;
      })
    );
    return answerArray.map(answer => new Answer(answer));
  }

  buildDateRangeAnswers({ id, label, secondaryLabel }) {
    return [
      new Answer({
        label,
        type: "Date",
        id: `${id}-from`,
        mandatory: true
      }),
      new Answer({
        label: secondaryLabel,
        type: "Date",
        id: `${id}-to`,
        mandatory: true
      })
    ];
  }
}

module.exports = Question;
