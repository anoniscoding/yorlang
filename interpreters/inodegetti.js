const IBase = require("./ibase.js");

class INodeGetTi extends IBase {

    interpreteNode(node) {
        for (let index = this.scopeStack().length - 1; index >= 0; index--) {
            if (this.environment().getTi(this.scopeStack()[index], node.name) != undefined) {
                return this.environment().getTi(this.scopeStack()[index], node.name);
            }
        }    

        throw new Error(`Variable ${node.name} is not defined`);
    }
}

module.exports = new INodeGetTi();