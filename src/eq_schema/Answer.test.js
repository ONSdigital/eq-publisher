/* eslint-disable camelcase */
const Answer = require("./Answer");

describe("Answer", () => {
  const createAnswerJSON = answer =>
    Object.assign(
      {
        id: 1,
        description: null,
        guidance: null,
        qCode: "51",
        label: "Number of male employees working more than 30 hours per week",
        mandatory: false,
        type: "PositiveInteger"
      },
      answer
    );

  it("should generate  a valid eQ answer from an author answer", () => {
    const answer = new Answer(createAnswerJSON({ type: "PositiveInteger" }));

    expect(answer).toMatchObject({
      id: "answer-1",
      type: "PositiveInteger",
      mandatory: false
    });
  });

  describe("converting options", () => {
    it("should not add options for basic answer types", () => {
      const answer = new Answer(createAnswerJSON());
      expect(answer.options).toBeUndefined();
    });

    it("should add options for multiple choice answers", () => {
      const answer = new Answer(
        createAnswerJSON({
          type: "Radio",
          options: [
            {
              id: 1,
              label: "Option one",
              childAnswerId: "foo"
            },
            {
              id: 2,
              label: "Option two",
              childAnswerId: "bar"
            }
          ]
        })
      );

      expect(answer.options).toEqual([
        {
          label: "Option one",
          value: "Option one",
          child_answer_id: "foo"
        },
        {
          label: "Option two",
          value: "Option two",
          child_answer_id: "bar"
        }
      ]);
    });

    it("should omit child_answer_id if not supplied", () => {
      const answer = new Answer(
        createAnswerJSON({
          type: "Radio",
          options: [
            {
              id: 1,
              label: "Option one"
            },
            {
              id: 2,
              label: "Option two"
            }
          ]
        })
      );

      answer.options.forEach(option => {
        expect(option.hasOwnProperty("child_answer_id")).toBe(false);
      });
    });

    it("should add options even if empty array", () => {
      const answer = new Answer(createAnswerJSON({ options: [] }));
      expect(answer.options).toEqual([]);
    });
  });
});
