const registeredInterpreters = require("./interpreters.js");
const constants = require("../constants.js");
const IBase = require("./ibase.js");

class MainInterpreter {

    constructor(environment, astList) {
        this.environment = () => environment;
        this.astList = astList;
        this.scope = ["global"];
    }

    getLeafValue(leaf) {
        if (leaf.value != null) {
            return leaf.value;
        }

        return null;
    }

    evaluateNode(node) {
        const leafValue = this.getLeafValue(node);
        if (leafValue == null) {
            const interpreter = registeredInterpreters[Symbol.for(node.operation)]; 
            if (interpreter instanceof IBase) return interpreter.interpreteNode.call(this, node);
            else throw new Error(`Registered ${interpreter} must be of type IBase`);
        }

        return leafValue;
    }

    evaluateAst() {
        for (let i = 0; i < this.astList.length; i++) {
            this.evaluateNode(this.astList[i]);
        }
    }

    getCurrentScope() {
        return this.scope[this.scope.length - 1];
    }
}

module.exports = MainInterpreter;