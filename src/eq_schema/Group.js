const Block = require('./Block');

class Group {

    constructor(section) {
        this.id = section.id.toString();
        this.title = section.title;
        this.blocks = this.buildBlocks(section.pages);
    }

    buildBlocks(pages) {
        return pages.map(page => new Block(page));
    }
}

module.exports = Group;