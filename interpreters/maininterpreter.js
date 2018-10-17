const registeredInterpreters = require("./interpreters.js");
const IBase = require("./ibase.js");

class MainInterpreter {

    constructor(environment, astList) {
        this.environment = () => environment;
        this.astList = astList;
        this.initScopeStack();
    }

    initScopeStack() {
        const _scopeStack = ["global"];
        this.getCurrentScope = () => _scopeStack[_scopeStack.length - 1];
        this.scopeStack = () => [..._scopeStack]
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
            const interpreter = registeredInterpreters[node.operation]; 
            if (interpreter instanceof IBase) return interpreter.interpreteNode.call(this, node);
            else throw new Error(`Could not find interpreter for operation ${node.operation}`);
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