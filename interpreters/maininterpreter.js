const registeredInterpreters = require("./interpreters.js");
const constants = require("../constants.js");
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

    throwError(msg) {
        this.parser().throwError(msg);
    }

    interpreteProgram(parser) {
        this.parser = () => parser;

        this.parser().pushToBlockTypeStack(constants.PROGRAM);
        while (this.parser().isNotEndOfFile()) {
            this.evaluateNode(this.parser().parseAst());
        }
        this.parser().popBlockTypeStack();
    }

    interpreteImportedProgram(parser) {
        new MainInterpreter(this.environment()).interpreteProgram(parser);
    }
}

module.exports = MainInterpreter;