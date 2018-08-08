const Block = require("./Block");
const Question = require("./Question");
const { concat } = require("lodash");

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

const otherCondition = [
  {
    id: 1,
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
        }
      ],
      other: {
        option: {
          id: 6,
          label: "other"
        }
      }
    },
    routingValue: {
      value: [5]
    }
  }
];

const secondCondition = {
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
    value: [5]
  }
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
      value: [1]
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
      createRuleJSON(nextPageGoto, basicRadioCondition),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            block: "block2",
            when: [
              { id: "answer2", condition: "not equals", value: "no" },
              { id: "answer2", condition: "not equals", value: "maybe" },
              { id: "answer2", condition: "set" }
            ]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing to the End of Questionnaire", () => {
    const block = new Block(
      "section title",
      createRuleJSON(endQuestionnaireGoto, basicRadioCondition),
      ctx
    );
    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "summary-group",
            when: [
              { id: "answer2", condition: "not equals", value: "no" },
              { id: "answer2", condition: "not equals", value: "maybe" },
              { id: "answer2", condition: "set" }
            ]
          }
        },
        { goto: { group: "summary-group" } }
      ]
    });
  });

  it("should build valid runner routing with 'other' answers", () => {
    const block = new Block(
      "section title",
      createRuleJSON(nextPageGoto, otherCondition),
      ctx
    );

    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            block: "block2",
            when: [
              { id: "answer3", condition: "not equals", value: "pepperoni" },
              { id: "answer3", condition: "not equals", value: "other" },
              { id: "answer3", condition: "set" }
            ]
          }
        },
        { goto: { block: "block2" } }
      ]
    });
  });

  it("should build valid runner routing with multiple conditions", () => {
    const twoConditions = concat(basicRadioCondition, secondCondition);

    const multiRules = createRuleJSON(absoluteSectionGoto, twoConditions);

    const block = new Block("section title", multiRules);

    expect(block).toMatchObject({
      id: "block1",
      title: "section title",
      questions: [expect.any(Question)],
      // eslint-disable-next-line camelcase
      routing_rules: [
        {
          goto: {
            group: "group2",
            when: [
              { id: "answer2", condition: "not equals", value: "no" },
              { id: "answer2", condition: "not equals", value: "maybe" },
              { id: "answer2", condition: "set" },
              { id: "answer3", condition: "not equals", value: "pepperoni" },
              { id: "answer3", condition: "not equals", value: "chorizo" },
              { id: "answer3", condition: "set" }
            ]
          }
        },
        {
          goto: { group: "group2" }
        }
      ]
    });
  });
});
