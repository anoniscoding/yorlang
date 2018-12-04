const IBase = require("./ibase.js");
const constants = require("../constants.js");
const WokeHelper = require("./helpers/woke_helper.js");

class INodeTi extends IBase {

    interpreteNode(node) {
        if (node.left.operation === constants.ARRAY_ELEM) {
            INodeTi.setArrayElement(this, node); 
            return;
        }

        if (WokeHelper.isWokeVariable(this, node.left)) {
            INodeTi.setWokeVariable(this, node); 
            return;
        }
        
        this.environment().setTi(this.getCurrentScope(), node.left, INodeTi.getValue(this, node.right));
    }

    static setWokeVariable(context, node) {
        const topIndex = context.scopeStack().length - 2;

        for (let index = topIndex; index >= 0; index--) {
            if (context.environment().getTi(context.scopeStack()[index], node.left) != undefined) {
                return context.environment().setTi(context.scopeStack()[index], node.left, INodeTi.getValue(context, node.right));
            }
        }
    }

    static setArrayElement(context, node) { //this also caters for setting multi-dimensional array element
        let arrayLiteral = INodeTi.getArrayLiteral(context, node);

        for (let i = 0; i < node.left.indexNodes.length; i++) {
            const arrayIndex = context.evaluateNode(node.left.indexNodes[i]);

            if (typeof arrayIndex == "number") {
                if (!(Array.isArray(arrayLiteral[arrayIndex])) && (i < node.left.indexNodes.length - 1)) {
                    context.throwError(`Cannot set invalid array element for array : ${node.left.name}`);
                }

                if ((Array.isArray(arrayLiteral[arrayIndex])) && (i < node.left.indexNodes.length - 1)) {
                    arrayLiteral = arrayLiteral[arrayIndex];
                }

                if (i == node.left.indexNodes.length - 1) {
                    arrayLiteral[arrayIndex] = context.evaluateNode(node.right);
                }
            } else {
                context.throwError(`Typeof index given for array ${node.name} must be a number`);
            }
        };
    }

    static getArrayLiteral(context, node) {
        const tiNode = { name: node.left.name, operation: constants.GET_TI };
        return context.evaluateNode(tiNode);
    }

    static getValue(context, node) {
        const value = context.evaluateNode(node);
        if (value == undefined) context.throwError(`Cannot set value undefined to variable ${node.left}`);
        return value;
    }
}

module.exports = new INodeTi(); 