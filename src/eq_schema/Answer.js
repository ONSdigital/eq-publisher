/* eslint-disable camelcase */

class Answer {
  constructor(answer) {
    this.id = `answer-${answer.id}`;
    this.alias = `answer_${answer.id}`;
    this.mandatory = answer.mandatory;
    this.type = answer.type;
    this.label = answer.label;
    this.description = answer.description;

    if (answer.type === "Currency") {
      this.currency = "GBP";
    }

    if (answer.hasOwnProperty("options")) {
      this.options = answer.options.map(this.buildOption);
    }
  }

  buildOption({ label, childAnswerId, description }) {
    const option = {
      label,
      value: label
    };

    if (description) {
      option.description = description;
    }

    if (childAnswerId) {
      option.child_answer_id = childAnswerId;
    }

    return option;
  }
}

module.exports = Answer;
