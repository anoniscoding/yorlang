const IBase = require("./ibase.js");

class INodeGetTi extends IBase {

    interpreteNode(node) {
        for (let index = this.scopeStack().length - 1; index >= 0; index--) {
            if (this.environment().getTi(this.scopeStack()[index], node.name) != undefined) {
                return this.environment().getTi(this.scopeStack()[index], node.name);
            }
        }    

        this.throwError(`Variable ${node.name} is undefined`);
    }
}

module.exports = new INodeGetTi();