const Block = require("./Block");

describe("Block", () => {
  it("should should build valid runner Block from Author page", () => {
    const authorJson = {
      id: 1,
      title: "Question 1",
      description: "This is quesstion 1",
      guidance: "",
      pageType: "Question",
      type: "General",
      answers: []
    };

    const block = new Block(authorJson);

    expect(block).toMatchObject({
      id: "block-1",
      title: "Question 1",
      description: "This is quesstion 1",
      questions: [
        {
          id: "question-1",
          title: "Question 1",
          type: "General",
          answers: []
        }
      ]
    });
  });

  describe("conversion of page types", () => {
    const authorJson = {
      id: 1,
      title: "Question 1",
      description: "This is quesstion 1",
      guidance: "",
      pageType: "QuestionPage",
      type: "General",
      answers: []
    };

    it("should convert QuestonPage to Questionnaire", () => {
      const block = new Block(authorJson);

      expect(block.type).toEqual("Questionnaire");
    });

    it("should convert InterstitialPage to Interstitial", () => {
      authorJson.pageType = "InterstitialPage";

      const block = new Block(authorJson);

      expect(block.type).toEqual("Interstitial");
    });
  });
});
