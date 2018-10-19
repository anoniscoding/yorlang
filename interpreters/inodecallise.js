const IBase = require("./ibase.js");

class INodeCallIse extends IBase {

    interpreteNode(node) {
        let iseNode = null;

        for (let index = this.scopeStack().length - 1; index >= 0; index--) {
            if (this.environment().getIse(this.scopeStack()[index], node.name) != undefined) {
                iseNode = this.environment().getIse(this.scopeStack()[index], node.name);
            }
        } 

        if (iseNode == null) throw new Error(`Ise ${node.name} is undefined`);

        this.pushToScopeStack(iseNode.name);

        for (let i = 0; i < iseNode.varTokens.length; i++) {
            this.environment().setTi(this.getCurrentScope(), iseNode.varTokens[i].value, this.evaluateNode(node.args[i]));
        }

        for (let i = 0; i < iseNode.body.length; i++) {
            const returnedValue = this.evaluateNode(iseNode.body[i]);
            if (returnedValue != undefined) return returnedValue;
        }

        this.popFromScopeStack();
    }
}

module.exports = new INodeCallIse();