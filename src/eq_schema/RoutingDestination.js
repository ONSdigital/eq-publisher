const { flatMap, get, findIndex } = require("lodash");
const mapValues = require("../utils/mapValues");

const mapping = {
  Section: "group",
  QuestionPage: "block"
};
const toRunner = mapValues(mapping);

class RoutingDestination {
  constructor(goto, pageId, ctx) {
    if (goto.__typename === "LogicalDestination") {
      this.block = this.getLogicalDestination(
        pageId,
        ctx,
        goto.logicalDestination
      );
    } else if (goto.__typename === "AbsoluteDestination") {
      this[
        toRunner(goto.absoluteDestination.__typename)
      ] = this.getAbsoluteDestination(goto.absoluteDestination);
    } else {
      throw new Error(`${goto} is not a valid destination object`);
    }
  }

  getAbsoluteDestination(destination) {
    if (destination.__typename === "QuestionPage") {
      return `block${destination.id}`;
    } else if (destination.__typename === "Section") {
      return `group${destination.id}`;
    } else {
      throw new Error(
        `${destination.__typename} is not a valid destination type`
      );
    }
  }

  getLogicalDestination(pageId, ctx, logicalDestination) {
    if (logicalDestination === "EndOfQuestionnaire") {
      return get(ctx, "summary") ? "summary" : "confirmation";
    } else if (logicalDestination === "NextPage") {
      return this.getNextPageDestination(pageId, ctx);
    } else {
      throw new Error(`${logicalDestination} is not a valid destination type`);
    }
  }

  getNextPageDestination(pageId, ctx) {
    const pages = flatMap(ctx.sections, "pages");
    const currentPageIndex = findIndex(pages, { id: pageId });
    const nextPage = pages[currentPageIndex + 1];
    return nextPage
      ? "block" + nextPage.id
      : get(ctx, "summary") ? "summary" : "confirmation";
  }
}

module.exports = RoutingDestination;
