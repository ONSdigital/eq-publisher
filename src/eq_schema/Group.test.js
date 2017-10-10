const Group = require("./Group");
const Block = require("./Block");

describe("Group", () => {
  const createGroupJSON = options =>
    Object.assign(
      {
        id: "1",
        title: "Section 1",
        pages: [
          {
            id: "2",
            answers: []
          }
        ]
      },
      options
    );

  it("should build valid runner Group from Author section", () => {
    const group = new Group(createGroupJSON());

    expect(group).toMatchObject({
      id: "group-1",
      title: "Section 1",
      blocks: [expect.any(Block)]
    });
  });

  it("should handle HTML values", () => {
    const group = new Group(
      createGroupJSON({ title: "<p>Section <em>1</em></p>" })
    );

    expect(group).toMatchObject({
      title: "Section <em>1</em>"
    });
  });
});
