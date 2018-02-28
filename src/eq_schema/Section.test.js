const Block = require("./Block");
const Section = require("./Section");

describe("Section", () => {
  const createSectionJSON = options =>
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

  it("should build valid runner Section from Author section", () => {
    const section = new Section(createSectionJSON());

    expect(section).toMatchObject({
      id: "section-1",
      title: "Section 1",
      groups: [
        {
          id: "group-1",
          title: "Section 1",
          blocks: [expect.any(Block)]
        }
      ]
    });
  });
});
