const Section = require("./Section");

describe("Section", () => {
  it("should construct a valid eQ runner section from an Author page", () => {
    const authorJson = {
      id: 1,
      title: "Question 1",
      description: "This is quesstion 1",
      guidance: "",
      pageType: "Question",
      type: "General",
      answers: []
    };

    const block = new Section(authorJson);

    expect(block).toMatchObject({
      id: "section-1",
      questions: [
        {
          answers: [],
          id: "question-1",
          title: "Question 1",
          type: "General"
        }
      ],
      title: "Question 1"
    });
  });
});
