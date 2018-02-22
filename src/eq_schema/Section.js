const Group = require("./Group");
const { getText } = require("../utils/HTMLUtils");

class Section {
  constructor(section) {
    this.id = `section-${section.id}`;
    this.title = getText(section.title);
    this.groups = this.buildGroups(section.id, this.title, section);
  }

  buildGroups(id, title, { description, pages }) {
    // Sections always contain a single group currently
    return [new Group(id, title, description, pages)];
  }
}

module.exports = Section;
