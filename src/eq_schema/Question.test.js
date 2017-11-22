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

  describe("DateRange", () => {
    it("should convert Author DateRange to Runner-compatible format", () => {
      const answers = [{ type: "DateRange", id: "1" }];
      const question = new Question(createQuestionJSON({ answers }));

      expect(question).toMatchObject({
        type: "DateRange",
        answers: [
          {
            label: "Period from",
            type: "Date",
            id: "answer-1-from",
            mandatory: true
          },
          {
            label: "Period to",
            type: "Date",
            id: "answer-1-to",
            mandatory: true
          }
        ]
      });
    });

    it("discards any other answers if DateRange used", () => {
      const answers = [
        { type: "DateRange", id: "1" },
        { type: "TextField", id: "2" }
      ];
      const question = new Question(createQuestionJSON({ answers }));

      expect(question.answers).not.toContainEqual(
        expect.objectContaining({
          type: "TextField"
        })
      );
    });
  });

  describe("piping", () => {
    const createPipe = (
      { id = "123", type = "TextField", text = "foo" } = {}
    ) =>
      `<span data-pipe="answers" data-id="${id}" data-type="${type}">${text}</span>`;

    it("should handle piped values in title", () => {
      const question = new Question(
        createQuestionJSON({
          title: createPipe()
        })
      );

      expect(question.title).toEqual("{{answers.answer-123}}");
    });

    it("should handle piped values in guidance", () => {
      const question = new Question(
        createQuestionJSON({
          guidance: `<h2>${createPipe()}</h2>`
        })
      );

      expect(question.guidance.content[0]).toEqual({
        title: "{{answers.answer-123}}"
      });
    });

    it("should handle piped values in description", () => {
      const question = new Question(
        createQuestionJSON({
          description: `<h2>${createPipe()}</h2>`
        })
      );

      expect(question.description).toEqual("{{answers.answer-123}}");
    });
  });
});
