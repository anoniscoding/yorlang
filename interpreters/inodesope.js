const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeSope extends IBase {

    interpreteNode(node) {
        this.environment().sope(this.evaluateNode(node.body));
    }
}

module.exports = new INodeSope();