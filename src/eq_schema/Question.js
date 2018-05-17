const Answer = require("./Answer");
const { getInnerHTML, parseGuidance } = require("../utils/HTMLUtils");
const { find, get, flow, flatten } = require("lodash/fp");
const convertPipes = require("../utils/convertPipes");

const findDateRange = flow(get("answers"), find({ type: "DateRange" }));

const processPipedText = flow(convertPipes, getInnerHTML);
const processGuidance = flow(convertPipes, parseGuidance);
const { isNil } = require("lodash");

class Question {
  constructor(question, ctx) {
    this.id = `question${question.id}`;
    this.title = processPipedText(question.title);
    this.guidance = processGuidance(question.guidance);
    this.description = processPipedText(question.description);

    const dateRange = findDateRange(question);

    if (dateRange) {
      this.type = "DateRange";
      this.answers = this.buildDateRangeAnswers(dateRange, ctx);
    } else {
      this.type = "General";
      this.answers = this.buildAnswers(question.answers, ctx);
    }
  }

  buildAnswers(answers, ctx) {
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
    return answerArray.map(answer => new Answer(answer, ctx));
  }

  buildDateRangeAnswers({ id, label, secondaryLabel }, ctx) {
    return [
      new Answer({
        label,
        type: "Date",
        id: `${id}from`,
        mandatory: true,
        ctx
      }),
      new Answer({
        label: secondaryLabel,
        type: "Date",
        id: `${id}to`,
        mandatory: true,
        ctx
      })
    ];
  }
}

module.exports = Question;
