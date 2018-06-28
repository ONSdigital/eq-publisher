const {
  flatMap,
  keyBy,
  isNil,
  parseInt,
  partition,
  remove,
  uniqWith,
  isEqual,
  sortBy,
  omit
} = require("lodash");

class RoutingConditions {
  constructor(conditions) {
    this.when = this.buildRoutingConditions(conditions);
  }

  removeInvalidConditions(conditions) {
    // Cannot have contains AND not contains entries for same conditions.
    // Remove not contains entry for each contained entry.
    const [contains] = partition(
      conditions,
      routingCondition => routingCondition.condition === "contains"
    );
    contains.forEach(({ id, value }) => {
      remove(conditions, { id, value, condition: "not contains" });
    });

    const sortedConditions = sortBy(conditions, "optionId").map(condition => {
      return omit(condition, "optionId");
    });

    return uniqWith(sortedConditions, isEqual);
  }

  buildRoutingConditions(conditions) {
    return this.removeInvalidConditions(
      flatMap(conditions, ({ answer, routingValue }) => {
        if (isNil(routingValue.value)) {
          return {
            id: `answer${answer.id}`,
            condition: "not set"
          };
        }

        if (answer.type === "Checkbox") {
          return answer.options.map(option => ({
            id: `answer${answer.id}`,
            condition:
              routingValue.value === option.id ? "contains" : "not contains",
            value: option.label,
            optionId: option.id
          }));
        } else if (answer.type === "Radio") {
          const optionsById = keyBy(answer.options, "id");
          const index = parseInt(routingValue.value);
          return {
            id: `answer${answer.id}`,
            condition: "equals",
            value: optionsById[index].label
          };
        }
      })
    );
  }
}

module.exports = RoutingConditions;
