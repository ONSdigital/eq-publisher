const Block = require("./Block");
const Question = require("./Question");
const { set } = require("lodash");

const nextPageGoto = {
  __typename: "LogicalDestination",
  logicalDestination: "NextPage"
};

const endQuestionnaireGoto = {
  __typename: "LogicalDestination",
  logicalDestination: "EndOfQuestionnaire"
};

const absoluteSectionGoto = {
  __typename: "AbsoluteDestination",
  absoluteDestination: {
    __typename: "Section",
    id: 2
  }
};

const absolutePageGoto = {
  __typename: "AbsoluteDestination",
  absoluteDestination: {
    __typename: "QuestionPage",
    id: 2
  }
};

const secondRule = {
  id: 2,
  operation: "And",
  goto: absoluteSectionGoto,
  conditions: [
    {
      id: 2,
      comparator: "Equal",
      answer: {
        id: 3,
        type: "Radio",
        options: [
          {
            id: 4,
            label: "pepperoni"
          },
          {
            id: 5,
            label: "pineapple"
          },
          {
            id: 6,
            label: "chorizo"
          }
        ]
      },
      routingValue: {
        value: 5
      }
    }
  ]
};

const basicRadioCondition = [
  {
    id: 1,
    comparator: "Equal",
    answer: {
      id: 2,
      type: "Radio",
      options: [
        {
          id: 1,
          label: "yes"
        },
        {
          id: 2,
          label: "no"
        },
        {
          id: 3,
          label: "maybe"
        }
      ]
    },
    routingValue: {
      value: 1
    }
  }
];

const basicCheckboxCondition = [
  {
    id: 1,
    comparator: "Equal",
    answer: {
      id: 2,
      type: "Checkbox",
      options: [
        {
          id: 1,
          label: "yes"
        },
        {
          id: 2,
          label: "no"
        },
        {
          id: 3,
          label: "maybe"
        }
      ]
    },
    routingValue: {
      value: 1
    }
  },
  {
    id: 1,
    comparator: "Equal",
    answer: {
      id: 2,
      type: "Checkbox",
      options: [
        {
          id: 1,
          label: "yes"
        },
        {
          id: 2,
          label: "no"
        },
        {
          id: 3,
          label: "maybe"
        }
      ]
    },
    routingValue: {
      value: 2
    }
  }
];

const ctx = {
  summary: true,
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
  const createRuleJSON = (destination, conditions) => ({
    id: 1,
    title: "Question 1",
    pageType: "Question",
    type: "General",
    answers: [],
    routingRuleSet: {
      else: destination,
      id: 1,
      routingRules: [
        {
          id: 1,
          operation: "And",
          goto: destination,
          conditions: conditions
        }
      ]
    }
  });

  it("should build valid runner routing to next page", () => {
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(nextPageGoto, basicRadioCondition),
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
            when: [{ id: "answer2", condition: "equals", value: "yes" }]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing to the End of Questionnaire", () => {
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(endQuestionnaireGoto, basicRadioCondition),
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
            group: "summary-group",
            when: [{ id: "answer2", condition: "equals", value: "yes" }]
          }
        },
        { goto: { group: "summary-group" } }
      ]
    });
  });

  it("should route to next section if next is chosen while at the end of a section", () => {
    let ruleJSON = createRuleJSON(nextPageGoto, basicRadioCondition);

    ruleJSON.id = 3;

    const block = new Block(
      "section title",
      "section description",
      ruleJSON,
      ctx
    );

    expect(block).toMatchObject({
      id: "block3",
      title: "section title",
      description: "section description",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "group2",
            when: [{ id: "answer2", condition: "equals", value: "yes" }]
          }
        },
        { goto: { group: "group2" } }
      ]
    });
  });

  it("should build valid runner routing with multiple checkbox options", () => {
    const block = new Block(
      "section title",
      "section description",
      createRuleJSON(absolutePageGoto, basicCheckboxCondition)
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
              { id: "answer2", condition: "contains", value: "yes" },
              { id: "answer2", condition: "contains", value: "no" },
              { id: "answer2", condition: "not contains", value: "maybe" }
            ]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing with multiple rules", () => {
    const multiRules = createRuleJSON(absoluteSectionGoto, basicRadioCondition);

    set(multiRules, "routingRuleSet.routingRules[1]", secondRule);

    const block = new Block("section title", "section description", multiRules);

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
            when: [{ id: "answer2", condition: "equals", value: "yes" }]
          }
        },
        {
          goto: {
            group: "group2",
            when: [{ id: "answer3", condition: "equals", value: "pineapple" }]
          }
        },
        {
          goto: { group: "group2" }
        }
      ]
    });
  });
});
