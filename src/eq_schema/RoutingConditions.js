const mapValues = require("../utils/mapValues");
const { flatMap, keyBy, at } = require("lodash");

const mapping = {
  Equal: "equals",
  NotEqual: "not equals"
};
const toRunner = mapValues(mapping);

class RoutingConditions {
  constructor(conditions) {
    this.when = this.buildRoutingConditions(conditions);
  }

  buildRoutingConditions(conditions) {
    return flatMap(conditions, ({ answer, routingValue, comparator }) => {
      const optionsById = keyBy(answer.options, "id");
      const filteredOptions = at(optionsById, routingValue.value);

      return filteredOptions.map(option => ({
        id: `answer${answer.id}`,
        condition: toRunner(comparator),
        value: option.label
      }));
    });
  }
}

module.exports = RoutingConditions;
