const mapFields = require("../utils/mapFields");
const { flatMap, keyBy, at } = require("lodash");

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
