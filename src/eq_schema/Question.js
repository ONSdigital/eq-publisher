const Answer = require("./Answer");
const { getInnerHTML, parseGuidance } = require("../utils/HTMLUtils");
const { find, get, flow, flatten, isNil, assign } = require("lodash/fp");
const convertPipes = require("../utils/convertPipes");

const findDateRange = flow(
  get("answers"),
  find({ type: "DateRange" })
);

const processPipedText = flow(
  convertPipes,
  getInnerHTML
);
const processGuidance = flow(
  convertPipes,
  parseGuidance
);

class Question {
  constructor(question) {
    this.id = `question${question.id}`;
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

  buildDateRangeAnswers(answer) {
    return answer.childAnswers.map(
      childAnswer =>
        new Answer(
          assign(childAnswer, { type: "Date", properties: answer.properties })
        )
    );
  }
}

module.exports = Question;
