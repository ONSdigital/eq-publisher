const Answer = require("./Answer");

describe("Answer", () => {
  it("should generate  a valid eQ answer from an author answer", () => {
    const authorJson = {
      id: 1,
      description: null,
      guidance: null,
      qCode: "51",
      label: "Number of male employees working more than 30 hours per week",
      type: "PositiveInteger",
      mandatory: false
    };

    const answer = new Answer(authorJson);

    expect(answer).toMatchObject({
      id: "answer-1",
      type: "PositiveInteger",
      mandatory: false
    });
  });
});
