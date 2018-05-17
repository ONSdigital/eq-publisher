const Block = require("./Block");
const Question = require("./Question");
const { omit } = require("lodash");
const ctx = {
  sections: [
    {
      id: 1,
      pages: [{ id: 1 }, { id: 2 }, { id: 3 }]
    },
    {
      id: 2,
      pages: [{ id: 4 }, { id: 5 }, { id: 6 }]
    },
    {
      id: 3,
      pages: [{ id: 7 }, { id: 8 }, { id: 9 }]
    }
  ]
};

describe("Rule", () => {
  const createRuleJSON = (testOperation, typename) => ({
    id: 1,
    title: "Question 1",
    pageType: "Question",
    type: "General",
    answers: [],
    RoutingRuleSet: {
      else: {
        __typename: typename,
        id: 2,
        section: {
          id: 1
        }
      },
      id: 1,
      routingRules: [
        {
          id: 1,
          operation: testOperation,
          goto: {
            __typename: typename,
            id: 2,
            section: {
              id: 1
            }
          },
          conditions: [
            {
              id: 1,
              comparator: "Equal",
              answer: {
                id: 2,
                options: [
                  {
                    id: 1,
                    value: "yes"
                  },
                  {
                    id: 2,
                    value: "no"
                  },
                  {
                    id: 3,
                    value: "maybe"
                  }
                ]
              },
              routingValue: {
                value: [1, 2]
              }
            }
          ]
        }
      ]
    }
  });

  it("should build valid runner routing to next page if destination is null", () => {
    const testOperation = "And";

    const jsonWithoutDestinations = omit(createRuleJSON(testOperation), [
      "RoutingRuleSet.else",
      "RoutingRuleSet.routingRules[0].goto"
    ]);
    const block = new Block(
      "section title",
      "section description",
      jsonWithoutDestinations,
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            block: "block2",
            when: [
              { id: "answer2", condition: "Equal", value: "yes" },
              { id: "answer2", condition: "Equal", value: "no" }
            ]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing from Author page to page with And", () => {
    const testOperation = "And";
    const typename = "QuestionPage";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, typename),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            block: "block2",
            when: [
              { id: "answer2", condition: "Equal", value: "yes" },
              { id: "answer2", condition: "Equal", value: "no" }
            ]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing from Author page to section with And", () => {
    const testOperation = "And";
    const typename = "Section";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, typename),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "group2",
            when: [
              { id: "answer2", condition: "Equal", value: "yes" },
              { id: "answer2", condition: "Equal", value: "no" }
            ]
          }
        },
        { goto: { group: "group2" } }
      ]
    });
  });

  it("should build valid runner routing from Author page to page with Or", () => {
    const testOperation = "Or";
    const typename = "QuestionPage";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, typename),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            block: "block2",
            when: [{ id: "answer2", condition: "Equal", value: "yes" }]
          }
        },
        {
          goto: {
            block: "block2",
            when: [{ id: "answer2", condition: "Equal", value: "no" }]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing from Author page to section with Or", () => {
    const testOperation = "Or";
    const typename = "Section";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(testOperation, typename),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "group2",
            when: [{ id: "answer2", condition: "Equal", value: "yes" }]
          }
        },
        {
          goto: {
            group: "group2",
            when: [{ id: "answer2", condition: "Equal", value: "no" }]
          }
        },
        { goto: { group: "group2" } }
      ]
    });
  });
});
