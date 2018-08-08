const Group = require("./Group");
const Block = require("./Block");
const ctx = {};

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
    let groupJSON = createGroupJSON();
    const group = new Group(
      groupJSON.id,
      groupJSON.title,
      groupJSON.pages,
      ctx
    );

    expect(group).toMatchObject({
      id: "group1",
      title: "Section 1",
      blocks: [expect.any(Block)]
    });
  });

  it("should handle HTML values", () => {
    let groupJSON = createGroupJSON({ title: "<p>Section <em>1</em></p>" });
    const group = new Group(
      groupJSON.id,
      groupJSON.title,
      groupJSON.pages,
      ctx
    );

    expect(group).toMatchObject({
      title: "Section <em>1</em>"
    });
  });
});
