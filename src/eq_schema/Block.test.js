const Block = require("./Block");
const Question = require("./Question");

describe("Block", () => {
  const createBlockJSON = options =>
    Object.assign(
      {
        id: 1,
        title: "Question 1",
        description: "This is question 1",
        pageType: "Question",
        type: "General",
        answers: []
      },
      options
    );

  it("should build valid runner Block from Author page", () => {
    const block = new Block(createBlockJSON());

    expect(block).toMatchObject({
      id: "block-1",
      title: "Question 1",
      description: "This is question 1",
      questions: [expect.any(Question)]
    });
  });

  it("should handle HTML values", () => {
    const block = new Block(
      createBlockJSON({
        title: "<p>Question <em>1</em></p>",
        description: "<p>This is <em><strong>question</strong> 1</em></p>"
      })
    );

    expect(block).toMatchObject({
      id: "block-1",
      title: "Question <em>1</em>",
      description: "This is <em><strong>question</strong> 1</em>",
      questions: [expect.any(Question)]
    });
  });

  describe("conversion of page types", () => {
    it("should convert QuestionPage to Questionnaire", () => {
      const block = new Block(createBlockJSON({ pageType: "QuestionPage" }));

      expect(block.type).toEqual("Questionnaire");
    });

    it("should convert InterstitialPage to Interstitial", () => {
      const block = new Block(
        createBlockJSON({ pageType: "InterstitialPage" })
      );

      expect(block.type).toEqual("Interstitial");
    });
  });
});
