/* eslint-disable camelcase */

class Answer {
  constructor(answer) {
    this.id = "answer-" + answer.id.toString();
    this.mandatory = answer.mandatory;
    this.type = answer.type;
    this.label = answer.label;

    if (answer.hasOwnProperty("options")) {
      this.options = answer.options.map(this.buildOption);
    }
  }

  buildOption({ label, childAnswerId }) {
    const option = {
      label,
      value: label
    };

    if (childAnswerId) {
      option.child_answer_id = childAnswerId;
    }

    return option;
  }
}

module.exports = Answer;
