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
    this.goto = {};
    if (!rule.goto) {
      this.goto.block = this.getUndefinedGoto(pageId, ctx);
    } else if (rule.goto.__typename === "QuestionPage") {
      this.goto.block = this.getGotoBlock(rule.goto);
    } else {
      this.goto.group = this.getGotoGroup(rule.goto);
    }

    if (!isNil(rule.conditions)) {
      this.goto.when = this.getConditions(rule.conditions);
    }
  }

  getGotoBlock(destination) {
    return "block" + get(destination, "id").toString();
  }

  getGotoGroup(destination) {
    return "group" + get(destination, "id").toString();
  }

  getUndefinedGoto(pageId, ctx) {
    const pages = flatten(
      flatMap(ctx.sections).map(sections => sections.pages)
    );
    const currentPageIndex = findIndex(pages, { id: pageId });
    const nextPage = get(pages, `[${currentPageIndex + 1}].id`, null);
    const lastPage = get(ctx, "summary") ? "summary" : "confirmation";
    return nextPage ? "block" + nextPage : lastPage;
  }

  getConditions(conditions) {
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

module.exports = RoutingRule;
