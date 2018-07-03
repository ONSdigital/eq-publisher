const Question = require("./Question");
const RoutingRule = require("./RoutingRule");
const RoutingDestination = require("./RoutingDestination");
const { get, isNil, remove, isEmpty } = require("lodash");
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
    this.questions = this.buildQuestions(page);

    if (!isNil(page.routingRuleSet)) {
      // eslint-disable-next-line camelcase
      this.routing_rules = this.buildRoutingRules(
        page.routingRuleSet,
        page.id,
        ctx
      );
    }
  }

  buildQuestions(page) {
    return [new Question(page)];
  }

  buildRoutingRules({ routingRules, else: elseDest }, pageId, ctx) {
    routingRules.forEach(rule => {
      remove(rule.conditions, condition => isNil(condition.answer));
    });

    const rules = routingRules
      .filter(rule => !isEmpty(rule.conditions))
      .map(rule => new RoutingRule(rule, pageId, ctx));

    const elseRule = { goto: new RoutingDestination(elseDest, pageId, ctx) };

    return rules.concat(elseRule);
  }

  convertPageType(type) {
    return get(pageTypeMappings, type, type);
  }
}

module.exports = Block;
