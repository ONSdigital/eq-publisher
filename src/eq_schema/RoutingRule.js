const { isNil, filter, flatMap, flatMapDeep, pick } = require("lodash");

class RoutingRule {
  constructor(rule) {
    this.goto = {};
    this.goto.block = this.getGotoBlock(rule.goto);
    if (!isNil(rule.conditions)) {
      this.goto.when = this.getConditions(rule.conditions);
    }
  }

  getGotoBlock(destination) {
    return "block-" + destination.toString();
  }

  getConditions(conditions) {
    const idArray = flatMap(conditions, condition => {
      return condition.routingValue;
    });

    let valueArray = flatMapDeep(idArray, id => {
      return conditions.map(condition => {
        return filter(condition.answer.options, { id });
      });
    });

    valueArray = valueArray.map(answerValue => {
      return pick(answerValue, "value");
    });

    return flatMap(conditions, condition => {
      return valueArray.map(answerValue => {
        return {
          id: `answer-` + condition.answer.id,
          condition: condition.comparator,
          value: answerValue.value
        };
      });
    });
  }
}

module.exports = RoutingRule;
