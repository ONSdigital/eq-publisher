const comparatorLookup = {
  Equal: "equals",
  NotEqual: "not equals",
  GreaterThan: "greater than",
  LessThan: "less than"
};

class NumberRoutingCondition {
  constructor(condition) {
    this.condition = condition;
  }

  buildRoutingCondition() {
    return {
      id: `answer${this.condition.answer.id}`,
      condition: comparatorLookup[this.condition.comparator],
      value: this.condition.routingValue.numberValue
    };
  }
}

module.exports = NumberRoutingCondition;
