const { flow, keyBy, map, flatMap, xor } = require("lodash/fp");

const createOptionByIdLookup = flow(flatMap("answer.options"), keyBy("id"));

class RoutingConditions {
  constructor(conditions) {
    this.when = this.buildRoutingConditions(conditions);
  }

  buildRoutingConditions(conditions) {
    const optionById = createOptionByIdLookup(conditions);

    return flatMap(condition => {
      const optionIds = map("id", condition.answer.options);
      const unselectedIds = xor(condition.routingValue.value, optionIds);

      return unselectedIds
        .map(id => ({
          id: `answer${condition.answer.id}`,
          condition: "not equals",
          value: optionById[id].label
        }))
        .concat({
          id: `answer${condition.answer.id}`,
          condition: "set"
        });
    }, conditions);
  }
}

module.exports = RoutingConditions;
