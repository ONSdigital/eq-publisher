const Question = require("./Question");
const RoutingRule = require("./RoutingRule");
const { get, flatMap, isNil } = require("lodash");
const { getInnerHTML } = require("../utils/HTMLUtils");

const pageTypeMappings = {
  QuestionPage: "Question",
  InterstitialPage: "Interstitial"
};

class Block {
  constructor(title, description, page, ctx) {
    this.id = `block${page.id}`;
    this.title = getInnerHTML(title);
    this.description = getInnerHTML(description);
    this.type = this.convertPageType(page.pageType);
    this.questions = this.buildQuestions(page, ctx);
    if (!isNil(page.routingRuleSet)) {
      // eslint-disable-next-line camelcase
      this.routing_rules = this.buildRoutingRules(
        page.routingRuleSet.routingRules,
        page.routingRuleSet,
        page.id,
        ctx
      );
    }
  }

  buildQuestions(page, ctx) {
    return [new Question(page, ctx)];
  }

  buildRoutingRules(routingRules, routingRuleSet, pageId, ctx) {
    const flattenedRules = flatMap(routingRules, rule => {
      if (rule.operation === "And") {
        return rule;
      }
      return flatMap(rule.conditions, (cond, i) => {
        return cond.routingValue.value.map(answerValue => {
          return {
            id: `${rule.id}-${i}`,
            operation: "And",
            conditions: [
              {
                id: i,
                comparator: cond.comparator,
                answer: cond.answer,
                routingValue: {
                  value: [answerValue]
                }
              }
            ],
            goto: rule.goto
          };
        });
      });
    });

    const elseRule = function(elseRule) {
      return {
        goto: elseRule.else
      };
    };

    const rules = flattenedRules.map(
      rule => new RoutingRule(rule, pageId, ctx)
    );
    return rules.concat(new RoutingRule(elseRule(routingRuleSet), pageId, ctx));
  }

  convertPageType(type) {
    return get(pageTypeMappings, type, type);
  }
}

module.exports = Block;
