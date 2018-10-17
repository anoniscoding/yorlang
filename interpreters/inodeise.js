const IBase = require("./ibase.js");

class INodeIse extends IBase {

    interpreteNode(node) {
        if (this.environment().getIse(this.getCurrentScope(), node.name) != undefined)
            throw new Error(`Ise with name ${node.name} already exists within the ${this.getCurrentScope()} scope`);

        this.environment().setIse(this.getCurrentScope(), node.name, node);
    }
}

module.exports = new INodeIse();