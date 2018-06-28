const Block = require("./Block");
const Question = require("./Question");
const ctx = {};

describe("Block", () => {
  const createBlockJSON = block =>
    Object.assign(
      {
        id: 1,
        title: "Question 1",
        pageType: "Question",
        type: "General",
        answers: []
      },
      block
    );

  it("should build valid runner Block from Author page", () => {
    const block = new Block(
      "section title",
      "section description",
      createBlockJSON(),
      ctx
    );

    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)]
    });
  });

  it("should handle HTML values", () => {
    const block = new Block(
      "<p>section <em>title</em>",
      "<p>section <strong>description</strong></p>",
      createBlockJSON(),
      ctx
    );

    expect(block).toMatchObject({
      id: "block1",
      title: "section <em>title</em>",
      description: "section <strong>description</strong>",
      questions: [expect.any(Question)]
    });
  });

  describe("conversion of page types", () => {
    it("should convert QuestionPage to Questionnaire", () => {
      const block = new Block(
        "section title",
        "section description",
        createBlockJSON({ pageType: "QuestionPage" }),
        ctx
      );

      expect(block.type).toEqual("Question");
    });

    it("should convert InterstitialPage to Interstitial", () => {
      const block = new Block(
        "section title",
        "section description",
        createBlockJSON({ pageType: "InterstitialPage" }),
        ctx
      );

      expect(block.type).toEqual("Interstitial");
    });
  });
});
