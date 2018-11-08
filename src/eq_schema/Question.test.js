const Question = require("./Question");
const Answer = require("./Answer");
const { omit, set, last } = require("lodash/fp");

describe("Question", () => {
  const createQuestionJSON = options =>
    Object.assign(
      {
        id: 1,
        title: "question title",
        description: "question description",
        type: "General",
        answers: [
          {
            id: "1",
            properties: {
              required: true
            }
          }
        ]
      },
      options
    );

  it("should construct a valid eQ runner question from an author question", () => {
    const question = new Question(createQuestionJSON());

    expect(question).toMatchObject({
      id: "question1",
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
      const answers = [
        {
          type: "DateRange",
          id: "1",
          label: "Period from",
          properties: { required: true },
          childAnswers: [
            { id: "1from", label: "Period from" },
            { id: "1to", label: "Period to" }
          ]
        }
      ];
      const question = new Question(createQuestionJSON({ answers }));

      expect(question).toMatchObject({
        type: "DateRange",
        answers: [
          {
            label: "Period from",
            type: "Date",
            id: "answer1from",
            mandatory: true
          },
          {
            label: "Period to",
            type: "Date",
            id: "answer1to",
            mandatory: true
          }
        ]
      });
    });

    it("discards any other answers if DateRange used", () => {
      const answers = [
        {
          type: "DateRange",
          id: "1",
          properties: { required: true },
          childAnswers: [
            { id: "1from", label: "Period from" },
            { id: "1to", label: "Period to" }
          ]
        },
        { type: "TextField", id: "2" }
      ];
      const question = new Question(createQuestionJSON({ answers }));

      expect(question.answers).not.toContainEqual(
        expect.objectContaining({
          type: "TextField"
        })
      );
    });

    it("should create other answer if exists", () => {
      const answers = [
        {
          type: "Checkbox",
          id: "1",
          properties: { required: true },
          options: [
            {
              id: "1",
              label: "Option 1"
            }
          ],
          other: {
            option: {
              id: "2",
              label: "Other option"
            },
            answer: {
              id: "2",
              type: "TextField",
              properties: { required: true }
            }
          }
        }
      ];
      const question = new Question(createQuestionJSON({ answers }));

      expect(question.answers).toEqual([
        expect.objectContaining({
          type: "Checkbox"
        }),
        expect.objectContaining({
          type: "TextField"
        })
      ]);
    });

    it("should not create other answer if other property is nil", () => {
      const answers = [
        {
          type: "Checkbox",
          id: "1",
          properties: { required: true },
          options: [
            {
              id: "1",
              label: "Option 1"
            }
          ],
          other: null
        }
      ];
      const question = new Question(createQuestionJSON({ answers }));

      expect(question.answers).toEqual([
        expect.objectContaining({
          type: "Checkbox"
        })
      ]);
    });
  });

  describe("piping", () => {
    const createPipe = ({
      id = 123,
      type = "TextField",
      text = "foo",
      pipeType = "answers"
    } = {}) =>
      `<span data-piped="${pipeType}" data-id="${id}" data-type="${type}">${text}</span>`;

    const createContext = (
      metadata = [{ id: "123", type: "Text", key: "my_metadata" }]
    ) => ({
      questionnaireJson: {
        metadata
      }
    });

    it("should handle piped values in title", () => {
      const question = new Question(
        createQuestionJSON({
          title: createPipe()
        }),
        createContext()
      );

      expect(question.title).toEqual("{{ answers['answer123'] }}");
    });

    it("should handle piped values in guidance", () => {
      const question = new Question(
        createQuestionJSON({
          guidance: `<h2>${createPipe({ pipeType: "metadata" })}</h2>`
        }),
        createContext()
      );

      expect(question.guidance.content[0]).toEqual({
        title: "{{ metadata['my_metadata'] }}"
      });
    });

    it("should handle piped values in description", () => {
      const question = new Question(
        createQuestionJSON({
          description: `<h2>${createPipe()}</h2>`
        }),
        createContext()
      );

      expect(question.description).toEqual("{{ answers['answer123'] }}");
    });
  });

  describe("mutually exclusive questions", () => {
    let answers;
    beforeEach(() => {
      answers = [
        {
          type: "Checkbox",
          id: "1",
          properties: { required: true },
          options: [
            {
              id: "1",
              label: "Option 1"
            },
            {
              id: "2",
              label: "Option 2"
            }
          ],
          mutuallyExclusiveOption: {
            id: "3",
            label: "Mutually exclusive"
          }
        }
      ];
    });

    it("should have a question type of mutually exclusive", () => {
      const question = new Question(createQuestionJSON({ answers }));
      expect(question).toMatchObject({
        type: "MutuallyExclusive"
      });
    });

    it("should have a question type of general when no mutually exclusive option", () => {
      const question = new Question(
        createQuestionJSON({
          answers: [omit("mutuallyExclusiveOption", answers[0])]
        })
      );
      expect(question).toMatchObject({
        type: "General"
      });
    });

    it("should have a question type of general when mutually exclusive option is null", () => {
      const question = new Question(
        createQuestionJSON({
          answers: [set("mutuallyExclusiveOption", null, answers[0])]
        })
      );
      expect(question).toMatchObject({
        type: "General"
      });
    });

    it("should return 2 answers when no other option", () => {
      const question = new Question(createQuestionJSON({ answers }));
      expect(question.answers).toHaveLength(2);
    });

    it("should have checkbox answer as last answer", () => {
      const question = new Question(createQuestionJSON({ answers }));
      expect(last(question.answers)).toMatchObject({
        type: "Checkbox"
      });
    });

    it("should have unique answer id for the last answer", () => {
      const question = new Question(createQuestionJSON({ answers }));
      expect(last(question.answers)).toMatchObject({
        id: "answer1-exclusive"
      });
    });

    it("should have a mandatory property", () => {
      const question = new Question(createQuestionJSON({ answers }));
      expect(question).toHaveProperty("mandatory");
    });

    it("should set mandatory on exclusive child answers to false", () => {
      const question = new Question(createQuestionJSON({ answers }));
      expect(question).toMatchObject({
        mandatory: true
      });
      question.answers.map(answer => {
        expect(answer).toMatchObject({
          mandatory: false
        });
      });
    });

    it("should have a checkbox answer as last answer when radio answer is used", () => {
      const question = new Question(
        createQuestionJSON({
          answers: [set("type", "Radio", answers[0])]
        })
      );
      expect(question.answers).toEqual([
        expect.objectContaining({
          type: "Radio"
        }),
        expect.objectContaining({
          type: "Checkbox"
        })
      ]);
    });

    it("should have a single option in the mutually exclusive answer", () => {
      const question = new Question(createQuestionJSON({ answers }));
      expect(last(question.answers).options).toEqual([
        {
          label: "Mutually exclusive",
          value: "Mutually exclusive"
        }
      ]);
    });

    it("should have a single option in mutually exclusive answer when other present", () => {
      const question = new Question(
        createQuestionJSON({
          answers: [
            set(
              "type",
              "Radio",
              set(
                "other",
                {
                  option: {
                    id: "4",
                    label: "Other option"
                  },
                  answer: {
                    id: "2",
                    type: "TextField",
                    properties: { required: true }
                  }
                },
                answers[0]
              )
            )
          ]
        })
      );

      expect(last(question.answers).options).toEqual([
        {
          label: "Mutually exclusive",
          value: "Mutually exclusive"
        }
      ]);
    });

    it("should inject child answers in between original and mutually exclusive", () => {
      const question = new Question(
        createQuestionJSON({
          answers: [
            set(
              "type",
              "Radio",
              set(
                "other",
                {
                  option: {
                    id: "4",
                    label: "Other option"
                  },
                  answer: {
                    id: "2",
                    type: "TextField",
                    properties: { required: true }
                  }
                },
                answers[0]
              )
            )
          ]
        })
      );

      expect(question.answers).toEqual([
        expect.objectContaining({
          type: "Radio"
        }),
        expect.objectContaining({
          type: "TextField"
        }),
        expect.objectContaining({
          type: "Checkbox"
        })
      ]);
    });
  });
});
