const Block = require('./Block');

class Group {

    constructor(section) {
        this.id = section.id.toString();
        this.title = section.title;
        this.blocks = this.buildBlocks(section.pages);
    }

    buildBlocks(pages) {
        const result = [];

        pages.forEach(page => {
            result.push(new Block(page));
        });

        return result;
    }
}

module.exports = Group;