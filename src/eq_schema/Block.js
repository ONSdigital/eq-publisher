const Question = require("./Question");
const RoutingRule = require("./RoutingRule");
const { get, flatMap } = require("lodash");
const { getInnerHTML } = require("../utils/HTMLUtils");

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
    this.routing_rules = this.buildRoutingRules(
      page.RoutingRuleSet.routingRules
    );
  }

  buildQuestions(page) {
    return [new Question(page)];
  }

  buildRoutingRules(routingRules) {
    const flattenedRules = flatMap(routingRules, rule => {
      if (rule.operation === "And") {
        return rule;
      }

      return rule.conditions.map((cond, i) => ({
        id: `${rule.id}-${i}`,
        operation: "And",
        conditions: [cond],
        goto: rule.goto
      }));
    });
    return flattenedRules.map(rule => new RoutingRule(rule));
  }

  convertPageType(type) {
    return get(pageTypeMappings, type, type);
  }
}

module.exports = Block;
