const registeredInterpreters = require("./interpreters.js");
class Interpreter {

    constructor(astList){
        this.astList = astList;
    }

    getLeafValue(leaf) {
        if (leaf.value != null) {
            return leaf.value;
        }
    }

    evaluateNode(node) {
        const leafValue = this.getLeafValue(node);
        if (leafValue == undefined) {
            return registeredInterpreters[Symbol.for(node.operation)].interpreteNode.call(this, node);
        }

        return leafValue;
    }

    evaluateAst() {
        for (let i = 0; i < this.astList.length; i++) {
            this.evaluateNode(this.astList[i]);
        }
    }
}

module.exports = Interpreter;