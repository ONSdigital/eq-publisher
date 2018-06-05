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
    return `block${destination.id}`;
  }

  getGotoGroup(destination) {
    return `group${destination.id}`;
  }

  getUndefinedGoto(pageId, ctx) {
    const pages = flatMap(ctx.sections, "pages");
    const currentPageIndex = findIndex(pages, { id: pageId });
    const nextPage = pages[currentPageIndex + 1];
    return nextPage
      ? "block" + nextPage.id
      : get(ctx, "summary") ? "summary" : "confirmation";
  }
}

module.exports = RoutingDestination;
