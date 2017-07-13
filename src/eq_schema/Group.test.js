const Group = require("./Group");

describe("Group", () => {
  it("should should build valid runner Group from Author section", () => {
    const authorJson = {
      id: 1,
      title: "Section.js 1",
      pages: []
    };

    const group = new Group(authorJson);

    expect(group).toMatchObject({
      id: "group-1",
      title: "Section.js 1",
      blocks: []
    });
  });
});
