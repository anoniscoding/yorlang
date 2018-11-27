const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeGetTi extends IBase {

    interpreteNode(node) {
        for (let index = INodeGetTi.getTopIndex(this, node.name); index >= 0; index--) {
            if (this.environment().getTi(this.scopeStack()[index], node.name) != undefined) {
                return this.environment().getTi(this.scopeStack()[index], node.name);
            }
        }

        this.throwError(`Variable ${node.name} is undefined`);
    }

    static getTopIndex(context, tiName) {
        const wokeList = context.environment().getTi(context.getCurrentScope(), constants.KW.WOKE);
        if (wokeList != undefined && wokeList.indexOf(tiName) != -1) {
            return context.scopeStack().length - 2;
        } 

        return context.scopeStack().length - 1;
    }
}

module.exports = new INodeGetTi();