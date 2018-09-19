const registeredInterpreters = require("./interpreters.js");
const IBase = require("./ibase.js");

class MainInterpreter {

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
            const interpreter = registeredInterpreters[Symbol.for(node.operation)]; 
            if (interpreter instanceof IBase) interpreter.interpreteNode.call(this, node);
            else throw new Error(`Registered ${interpreter} must be of type IBase`);
        }

        return leafValue;
    }

    evaluateAst() {
        for (let i = 0; i < this.astList.length; i++) {
            this.evaluateNode(this.astList[i]);
        }
    }
}

module.exports = MainInterpreter;