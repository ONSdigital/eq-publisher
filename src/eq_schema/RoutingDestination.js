const { flatMap, flatten, get, findIndex } = require("lodash");

class RoutingDestination {
  constructor(goto, pageId, ctx) {
    if (!goto) {
      this.block = this.getUndefinedGoto(pageId, ctx);
    } else if (goto.__typename === "QuestionPage") {
      this.block = this.getGotoBlock(goto);
    } else if (goto.__typename === "Section") {
      this.group = this.getGotoGroup(goto);
    } else {
      throw new Error(`${goto} is not a valid destination object`);
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
    return nextPage
      ? "block" + nextPage
      : get(ctx, "summary") ? "summary" : "confirmation";
  }
}

module.exports = RoutingDestination;
