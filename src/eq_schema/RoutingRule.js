class RoutingRule {
  constructor(rule) {
    this.goto = {};
    this.goto.block = this.getGotoBlock(rule.goto);
    this.goto.when = this.getConditions(rule.conditions);
  }

  getGotoBlock(destination) {
    return "block-" + destination.toString();
  }

  getConditions(conditions) {
    return conditions.map(condition => ({
      id: `answer-` + condition.answer.id,
      condition: condition.comparator,
      value: condition.answer.options.value
    }));
  }
}

module.exports = RoutingRule;
