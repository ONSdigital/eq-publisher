const RoutingDestination = require("./RoutingDestination");
const RoutingConditions = require("./RoutingConditions");

class RoutingRule {
  constructor(rule, pageId, ctx) {
    this.goto = {
      ...this.buildRoutingDestination(rule.goto, pageId, ctx),
      ...this.buildRoutingConditions(rule.conditions)
    };
  }

  buildRoutingDestination(goto, pageId, ctx) {
    return new RoutingDestination(goto, pageId, ctx);
  }

  buildRoutingConditions(conditions) {
    return conditions ? new RoutingConditions(conditions) : null;
  }
}

module.exports = RoutingRule;
