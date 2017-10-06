const Question = require("./Question");
const Answer = require("./Answer");

describe("Question", () => {
  const createQuestionJSON = options =>
    Object.assign(
      {
        id: 1,
        title: "question title",
        description: "question description",
        type: "General",
        answers: [{ id: "1" }]
      },
      options
    );

  it("should construct a valid eQ runner question from an author question", () => {
    const question = new Question(createQuestionJSON());

    expect(question).toMatchObject({
      id: "question-1",
      title: "question title",
      type: "General",
      answers: [expect.any(Answer)]
    });
  });

  it("should handle HTML values", () => {
    const question = new Question(
      createQuestionJSON({
        title: "<p>question title</p>"
      })
    );

    expect(question).toMatchObject({
      title: "question title"
    });
  });

  describe("guidance", () => {
    describe("when there is content", () => {
      it("should be populated", () => {
        const question = new Question(
          createQuestionJSON({
            guidance: "<h2>hello world</h2>"
          })
        );
        expect(question.guidance).toBeDefined();
      });
    });

    describe("when there is no content", () => {
      it("should be undefined", () => {
        const question = new Question(createQuestionJSON());
        expect(question.guidance).toBeUndefined();
      });
    });
  });
});
