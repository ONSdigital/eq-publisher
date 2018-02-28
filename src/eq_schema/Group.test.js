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
    let groupJSON = createGroupJSON();
    const group = new Group(
      groupJSON.id,
      groupJSON.title,
      groupJSON.description,
      groupJSON.pages
    );

    expect(group).toMatchObject({
      id: "group-1",
      title: "Section 1",
      blocks: [expect.any(Block)]
    });
  });

  it("should handle HTML values", () => {
    let groupJSON = createGroupJSON({ title: "<p>Section <em>1</em></p>" });
    const group = new Group(
      groupJSON.id,
      groupJSON.title,
      groupJSON.description,
      groupJSON.pages
    );

    expect(group).toMatchObject({
      title: "Section <em>1</em>"
    });
  });
});
