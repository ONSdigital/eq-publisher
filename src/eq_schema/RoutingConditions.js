const mapFields = require("../utils/mapFields");
const mapping = {
  Equal: "equals",
  NotEqual: "not equals"
};
const toRunner = mapFields(mapping);

const { filter, flatMap, flatMapDeep, pick } = require("lodash");

class RoutingConditions {
  constructor(conditions) {
    this.when = this.buildRoutingConditions(conditions);
  }

  buildRoutingConditions(conditions) {
    const idArray = flatMap(conditions, condition => {
      return condition.routingValue.value;
    });

    let valueArray = flatMapDeep(idArray, id => {
      return conditions.map(condition => {
        return filter(condition.answer.options, { id });
      });
    });

    valueArray = valueArray.map(answerValue => {
      return pick(answerValue, "label");
    });

    return flatMapDeep(conditions, condition => {
      return valueArray.map(answerValue => {
        return {
          id: `answer` + condition.answer.id,
          condition: toRunner(condition.comparator),
          value: answerValue.label
        };
      });
    });
  }
}

module.exports = RoutingConditions;
