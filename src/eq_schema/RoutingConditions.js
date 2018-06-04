const mapFields = require("../utils/mapFields");
const { flatMap, keyBy } = require("lodash");

const mapping = {
  Equal: "equals",
  NotEqual: "not equals"
};
const toRunner = mapFields(mapping);

class RoutingConditions {
  constructor(conditions) {
    this.when = this.buildRoutingConditions(conditions);
  }

  buildRoutingConditions(conditions) {
    const valueIds = flatMap(conditions, "routingValue.value");

    const options = flatMap(conditions, ({ answer, comparator }) => {
      return answer.options.map(option => ({
        id: option.id,
        answerId: `answer${answer.id}`,
        condition: toRunner(comparator),
        value: option.label
      }));
    });

    const optionsById = keyBy(options, "id");

    return valueIds.map(valueId => {
      const { condition, value, answerId: id } = optionsById[valueId];
      return { id, condition, value };
    });
  }
}

module.exports = RoutingConditions;
