const Block = require("./Block");
const Question = require("./Question");

describe("Rule", () => {
  let testOperation;
  const createRuleJSON = rule =>
    Object.assign(
      {
        id: 1,
        title: "Question 1",
        pageType: "Question",
        type: "General",
        answers: [],
        RoutingRuleSet: {
          else: {
            page: {
              id: 2
            }
          },
          id: 1,
          routingRules: [
            {
              id: 1,
              operation: testOperation,
              goto: {
                page: {
                  id: 2
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
                  routingValue: [1, 2]
                }
              ]
            }
          ]
        }
      },
      rule
    );

  it("should build valid runner routing from Author page with And", () => {
    testOperation = "And";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON()
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

  it("should build valid runner routing from Author page with Or", () => {
    testOperation = "Or";
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON()
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
});
