const IBase = require("./ibase.js");
const feedbackMessages = require("../feedbackMessages.js");

class INodeIse extends IBase {
    interpreteNode (node) {
        if (this.environment().getIse(this.getCurrentScope(), node.name) !== undefined) { this.throwError(feedbackMessages.iseAlreadyExist(node.name, this.getCurrentScope())); }

        this.environment().setIse(this.getCurrentScope(), node.name, node);
    }
}

module.exports = new INodeIse();
