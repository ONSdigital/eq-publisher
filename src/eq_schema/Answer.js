/* eslint-disable camelcase */
const { isNil } = require("lodash/fp");
const { merge } = require("lodash");

class Answer {
  constructor(answer) {
    this.id = `answer-${answer.id}`;
    this.mandatory = answer.mandatory;
    this.type = answer.type;
    this.label = answer.label;
    this.description = answer.description;

    if (!isNil(answer.parentAnswerId)) {
      this.parent_answer_id = `answer-${answer.parentAnswerId}`;
    }

    if (answer.type === "Currency") {
      this.currency = "GBP";
    }

    if (!isNil(answer.options)) {
      this.options = answer.options.map(this.buildOption);
    }

    if (!isNil(answer.other)) {
      this.options = this.options.concat(this.buildOtherOption(answer.other));
    }
  }

  static buildChildAnswer(
    { id, mandatory, type, label, description },
    parentAnswerId
  ) {
    return {
      id,
      mandatory,
      type,
      label,
      description,
      parentAnswerId
    };
  }

  buildOption({ label, description }) {
    const option = {
      label,
      value: label
    };

    if (description) {
      option.description = description;
    }
    return option;
  }

  buildOtherOption(other) {
    return merge({}, this.buildOption(other.option), {
      child_answer_id: `answer-${other.answer.id}`
    });
  }
}

module.exports = Answer;
