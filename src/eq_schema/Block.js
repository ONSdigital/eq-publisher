const Question = require("./Question");
const RoutingRule = require("./RoutingRule");
const { get, flatMap, isNil } = require("lodash");
const { getInnerHTML } = require("../utils/HTMLUtils");
const util = require("util");

const pageTypeMappings = {
  QuestionPage: "Question",
  InterstitialPage: "Interstitial"
};

class Block {
  constructor(title, description, page) {
    this.id = `block${page.id}`;
    this.title = getInnerHTML(title);
    this.description = getInnerHTML(description);
    this.type = this.convertPageType(page.pageType);
    this.questions = this.buildQuestions(page);
    if (!isNil(page.RoutingRuleSet)) {
      this.routing_rules = this.buildRoutingRules(
        page.RoutingRuleSet.routingRules,
        page.RoutingRuleSet
      );
    }
  }

  buildQuestions(page) {
    return [new Question(page)];
  }

  buildRoutingRules(routingRules, RoutingRuleSet) {
    const flattenedRules = flatMap(routingRules, rule => {
      if (rule.operation === "And") {
        return rule;
      }

      return flatMap(rule.conditions, (cond, i) => {
        return cond.routingValue.map(answerValue => {
          return {
            id: `${rule.id}-${i}`,
            operation: "And",
            conditions: [
              {
                id: i,
                comparator: cond.comparator,
                answer: cond.answer,
                routingValue: [answerValue]
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

    const rules = flattenedRules.map(rule => new RoutingRule(rule));
    return rules.concat(new RoutingRule(elseRule(RoutingRuleSet)));
  }

  convertPageType(type) {
    return get(pageTypeMappings, type, type);
  }
}

module.exports = Block;
