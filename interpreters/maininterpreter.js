const registeredInterpreters = require("./interpreters.js");
const IBase = require("./ibase.js");

class MainInterpreter {

    constructor(environment) {
        this.environment = () => environment;
        this.initScopeStack();
    }

    initScopeStack() {
        const _scopeStack = ["global"];
        this.getCurrentScope = () => _scopeStack[_scopeStack.length - 1];
        this.scopeStack = () => [..._scopeStack];
        this.pushToScopeStack = (scope) => _scopeStack.push(scope);
        this.popFromScopeStack = () => _scopeStack.pop();
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

    interpreteProgram(astList) {
        for (let i = 0; i < astList.length; i++) {
            this.evaluateNode(astList[i]);
        }
    }
}

module.exports = MainInterpreter;