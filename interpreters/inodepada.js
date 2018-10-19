const IBase = require("./ibase.js");

class INodePada extends IBase {

    interpreteNode(node) {
        return this.evaluateNode(node.body);
    }
}

module.exports = new INodePada();