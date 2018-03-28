const Block = require("./Block");
const RoutingRule = require("./RoutingRule");
const util = require("util");

describe("Rule", () => {
  const createRuleJSON = rule =>
    Object.assign(
      {
        id: 1,
        title: "Question 1",
        pageType: "Question",
        type: "General",
        answers: [],
        RoutingRuleSet: {
          id: 1,
          routingRules: [
            {
              id: 1,
              operation: "Add",
              goto: 2,
              conditions: [
                {
                  id: 1,
                  comparator: "Equal",
                  answer: {
                    id: 2,
                    options: {
                      value: "yes"
                    }
                  }
                }
              ]
            }
          ]
        }
      },
      rule
    );

  it("should build valid runner Block from Author page", () => {
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON()
    );
  });
});
