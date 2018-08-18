const BaseNodeLiteral = require("./basenl.js");

class NumberNl extends BaseNodeLiteral {

    getNodeLiteral() {
        return this.parseLeaf();
    }
}

module.exports = new NumberNl();