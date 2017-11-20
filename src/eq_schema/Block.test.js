const Block = require("./Block");
const Question = require("./Question");

describe("Block", () => {
  const createBlockJSON = block =>
    Object.assign(
      {
        id: 1,
        title: "Question 1",
        description: "This is question 1",
        pageType: "Question",
        type: "General",
        answers: []
      },
      block
    );

  it("should build valid runner Block from Author page", () => {
    const block = new Block("section title", createBlockJSON());

    expect(block).toMatchObject({
      id: "block-1",
      title: "section title",
      description: "This is question 1",
      questions: [expect.any(Question)]
    });
  });

  it("should handle HTML values", () => {
    const block = new Block(
      "<p>section <em>title</em>",
      createBlockJSON({
        description: "<p>This is <em><strong>question</strong> 1</em></p>"
      })
    );

    expect(block).toMatchObject({
      id: "block-1",
      title: "section <em>title</em>",
      description: "This is <em><strong>question</strong> 1</em>",
      questions: [expect.any(Question)]
    });
  });

  describe("conversion of page types", () => {
    it("should convert QuestionPage to Questionnaire", () => {
      const block = new Block(
        "section title",
        createBlockJSON({ pageType: "QuestionPage" })
      );

      expect(block.type).toEqual("Questionnaire");
    });

    it("should convert InterstitialPage to Interstitial", () => {
      const block = new Block(
        "section title",
        createBlockJSON({ pageType: "InterstitialPage" })
      );

      expect(block.type).toEqual("Interstitial");
    });
  });

  describe("piping", () => {
    const createPipe = (
      { id = "123", type = "TextField", text = "foo" } = {}
    ) =>
      `<span data-pipe="answers" data-id="${id}" data-type="${type}">${text}</span>`;

    it("should handle piped values in description", () => {
      const block = new Block(
        "section title",
        createBlockJSON({ description: `<p>${createPipe()}</p>` })
      );

      expect(block.description).toEqual("{{answers.answer-123}}");
    });
  });
});
