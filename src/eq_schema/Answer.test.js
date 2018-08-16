/* eslint-disable camelcase */
const Answer = require("./Answer");
const Question = require("./Question");

describe("Answer", () => {
  const createAnswerJSON = answer =>
    Object.assign(
      {
        id: 1,
        description: "This is a description",
        guidance: null,
        qCode: "51",
        label: "Number of male employees working more than 30 hours per week",
        type: "PositiveInteger",
        properties: {
          required: true,
          decimals: 2
        }
      },
      answer
    );

  it("should generate a valid eQ answer from an author answer", () => {
    const answer = new Answer(createAnswerJSON({ type: "PositiveInteger" }));

    expect(answer).toMatchObject({
      id: "answer1",
      type: "PositiveInteger",
      mandatory: true,
      decimal_places: 2,
      description: "This is a description"
    });
  });

  it("should set currency to GBP for currency types", () => {
    const answer = new Answer(createAnswerJSON({ type: "Currency" }));
    expect(answer.currency).toBe("GBP");
  });

  it("should set correct to answer type for different date formats", () => {
    const date = new Answer(
      createAnswerJSON({
        type: "Date",
        properties: {
          format: "dd/mm/yyyy"
        }
      })
    );
    expect(date.type).toBe("Date");

    const monthYearDate = new Answer(
      createAnswerJSON({
        type: "Date",
        properties: {
          format: "mm/yyyy"
        }
      })
    );
    expect(monthYearDate.type).toBe("MonthYearDate");

    const yearDate = new Answer(
      createAnswerJSON({
        type: "Date",
        properties: {
          format: "yyyy"
        }
      })
    );
    expect(yearDate.type).toBe("YearDate");
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
              description: "A short description"
            },
            {
              id: 2,
              label: "Option two",
              description: "Another description"
            }
          ]
        })
      );

      expect(answer.options).toEqual([
        {
          label: "Option one",
          value: "Option one",
          description: "A short description"
        },
        {
          label: "Option two",
          value: "Option two",
          description: "Another description"
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

  it("should omit option description if null value provided", () => {
    const answer = new Answer(
      createAnswerJSON({
        type: "Radio",
        options: [
          {
            id: 1,
            label: "Option one",
            description: null
          },
          {
            id: 2,
            label: "Option two",
            description: null
          }
        ]
      })
    );

    expect(answer.options).toEqual([
      {
        label: "Option one",
        value: "Option one"
      },
      {
        label: "Option two",
        value: "Option two"
      }
    ]);
  });

  describe('creating checkbox/radio answers with "other"', () => {
    let checkboxWithOther;
    let question;

    beforeEach(() => {
      checkboxWithOther = createAnswerJSON({
        id: 1,
        type: "Checkbox",
        options: [
          {
            id: 1,
            label: "One"
          },
          {
            id: 2,
            label: "Two"
          }
        ],
        other: {
          option: {
            id: 3,
            label: "Other",
            description: "Hello"
          },
          answer: {
            id: 4,
            description: "This is a description",
            guidance: "Here's your guidance",
            properties: {
              required: false
            },
            qCode: "20",
            label: "This is not a label",
            type: "TextField"
          }
        }
      });

      question = new Question(
        createAnswerJSON({
          answers: [checkboxWithOther]
        })
      );
    });

    it('should generate a second answer for the "other" text field', () => {
      expect(question.answers).toHaveLength(2);
      expect(question.answers[0]).toEqual(
        expect.objectContaining({
          type: "Checkbox"
        })
      );
      expect(question.answers[1]).toEqual(
        expect.objectContaining({
          parent_answer_id: "answer1",
          description: "This is a description",
          mandatory: false,
          id: "answer4",
          label: "This is not a label",
          type: "TextField"
        })
      );
    });

    it("should create an additional option for the checkbox answer", () => {
      const { label, description } = checkboxWithOther.other.option;
      expect(question.answers[0].options).toHaveLength(3);
      expect(question.answers[0].options[2]).toEqual(
        expect.objectContaining({
          label,
          description,
          child_answer_id: `answer${checkboxWithOther.other.answer.id}`
        })
      );
    });
  });
});
