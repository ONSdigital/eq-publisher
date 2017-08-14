/* eslint-disable camelcase */
class Answer {
  constructor(answer) {
    this.id = "answer-" + answer.id.toString();
    this.mandatory = answer.mandatory;
    this.type = answer.type;
    this.label = answer.label;

    if (answer.hasOwnProperty("options")) {
      this.options = answer.options.map(({ label, value, childAnswerId }) => {
        return {
          label,
          value,
          child_answer_id: childAnswerId || ""
        };
      });
    }
  }
}

module.exports = Answer;
