const RoutingDestination = require("./RoutingDestination");
const RoutingConditions = require("./RoutingConditions");
const mapFields = require("../utils/mapFields");
const mapping = {
  Equal: "equals",
  NotEqual: "not equals"
};
const toRunner = mapFields(mapping);

const {
  isNil,
  filter,
  flatMap,
  flatMapDeep,
  flatten,
  pick,
  get,
  findIndex
} = require("lodash");

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
