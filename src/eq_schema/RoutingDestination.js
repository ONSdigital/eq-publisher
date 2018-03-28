const { flatMap, get, findIndex, isNil } = require("lodash");

class RoutingDestination {
  constructor(goto, pageId, ctx) {
    if (goto.__typename === "LogicalDestination") {
      this.getLogicalDestination(pageId, ctx, goto.logicalDestination);
    } else if (goto.__typename === "AbsoluteDestination") {
      this.getAbsoluteDestination(goto.absoluteDestination);
    } else {
      throw new Error(`${goto} is not a valid destination object`);
    }
  }

  getAbsoluteDestination(destination) {
    if (destination.__typename === "QuestionPage") {
      return (this.block = `block${destination.id}`);
    } else if (destination.__typename === "Section") {
      return (this.group = `group${destination.id}`);
    } else {
      throw new Error(
        `${destination.__typename} is not a valid destination type`
      );
    }
  }

  getLogicalDestination(pageId, ctx, logicalDestination) {
    if (logicalDestination === "EndOfQuestionnaire") {
      return (this.group = get(ctx, "summary")
        ? "summary-group"
        : "confirmation-group");
    } else if (logicalDestination === "NextPage") {
      return this.getNextPageDestination(pageId, ctx);
    } else {
      throw new Error(`${logicalDestination} is not a valid destination type`);
    }
  }

  getNextPageDestination(pageId, ctx) {
    const pages = flatMap(ctx.sections, section => {
      return section.pages.map(page => {
        return { id: page.id, sectionId: section.id };
      });
    });

    const currentPageIndex = findIndex(pages, { id: pageId });
    const currentPage = pages[currentPageIndex];
    const nextPage = pages[currentPageIndex + 1];

    if (currentPage.sectionId === nextPage.sectionId) {
      return (this.block = `block${nextPage.id}`);
    } else if (currentPage.sectionId !== nextPage.sectionId) {
      return (this.group = `group${nextPage.sectionId}`);
    } else if (isNil(nextPage)) {
      return get(ctx, "summary") ? "summary-group" : "confirmation-group";
    }
  }
}

module.exports = RoutingDestination;
