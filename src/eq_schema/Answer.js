/* eslint-disable camelcase */
const { isNil } = require("lodash/fp");

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

    if (this.options && !isNil(answer.otherAnswer)) {
      this.options.push(
        this.buildOption({
          label: "Other",
          otherAnswerId: answer.otherAnswer.id
        })
      );
    }
  }

  buildOption({ label, description, otherAnswerId }) {
    const option = {
      label,
      value: label
    };

    if (description) {
      option.description = description;
    }

    if (otherAnswerId) {
      option.child_answer_id = otherAnswerId.toString();
    }

    return option;
  }
}

module.exports = Answer;
