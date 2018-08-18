const BaseNodeLiteral = require("./basenl.js");

class StringNl extends BaseNodeLiteral {

    getNodeLiteral() {
        return this.parseLeaf();
    }
}

module.exports = new StringNl();