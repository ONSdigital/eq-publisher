/* eslint-disable camelcase */
const Answer = require("./Answer");
const { merge } = require("lodash");

describe("Answer", () => {
  let basicFixture;
  let positiveIntegerFixture;
  let radioFixture;
  let checkboxFixture;

  beforeEach(() => {
    basicFixture = {
      id: 1,
      description: null,
      guidance: null,
      qCode: "51",
      label: "Number of male employees working more than 30 hours per week",
      mandatory: false
    };

    positiveIntegerFixture = merge({}, basicFixture, {
      type: "PositiveInteger"
    });

    radioFixture = merge({}, basicFixture, {
      type: "Radio",
      options: [
        {
          id: 1,
          label: "Option one",
          value: "option1"
        },
        {
          id: 2,
          label: "Option two",
          value: "option2"
        }
      ]
    });

    checkboxFixture = merge({}, basicFixture, {
      type: "Checkbox",
      options: []
    });
  });

  it("should generate  a valid eQ answer from an author answer", () => {
    const answer = new Answer(positiveIntegerFixture);
    expect(answer).toMatchObject({
      id: "answer-1",
      type: "PositiveInteger",
      mandatory: false
    });
  });

  describe("converting options", () => {
    it("should not add options for basic answer types", () => {
      const answer = new Answer(positiveIntegerFixture);
      expect(answer).not.toMatchObject({
        options: [
          {
            label: "Option one",
            value: "option1",
            child_answer_id: ""
          },
          {
            label: "Option two",
            value: "option2",
            child_answer_id: ""
          }
        ]
      });
    });

    it("should add options for multiple choice answers", () => {
      const answer = new Answer(radioFixture);
      expect(answer).toMatchObject({
        options: [
          {
            label: "Option one",
            value: "option1",
            child_answer_id: ""
          },
          {
            label: "Option two",
            value: "option2",
            child_answer_id: ""
          }
        ]
      });
    });

    it("should add options even if empty array", () => {
      const answer = new Answer(checkboxFixture);
      expect(answer).toMatchObject({
        options: []
      });
    });
  });
});
