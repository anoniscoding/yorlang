const IBase = require("./ibase.js");
const constants = require("../constants.js");
const WokeHelper = require("./helpers/woke_helper.js");

class INodeJeki extends IBase {
    interpreteNode (node) {
        if (node.left.operation === constants.ARRAY_ELEM) {
            INodeJeki.setArrayElement(this, node);
            return;
        }

        if (WokeHelper.isWokeVariable(this, node.left)) {
            INodeJeki.setWokeVariable(this, node);
            return;
        }

        this.environment().setJeki(this.getCurrentScope(), node.left, INodeJeki.getValue(this, node.right));
    }

    static setWokeVariable (context, node) {
        const topIndex = context.scopeStack().length - 2;

        for (let index = topIndex; index >= 0; index--) {
            if (context.environment().getJeki(context.scopeStack()[index], node.left) !== undefined) {
                return context.environment().setJeki(context.scopeStack()[index], node.left, INodeJeki.getValue(context, node.right));
            }
        }
    }

    static setArrayElement (context, node) { // this also caters for setting multi-dimensional array element
        let arrayLiteral = INodeJeki.getArrayLiteral(context, node);

        for (let i = 0; i < node.left.indexNodes.length; i++) {
            const arrayIndex = context.evaluateNode(node.left.indexNodes[i]);

            if (arrayIndex === "" && i === node.left.indexNodes.length - 1) {
                // push right node to the last location in the array when index is empty
                arrayLiteral.push(context.evaluateNode(node.right));
                return;
            }

            if (typeof arrayIndex === "number") {
                if (!(Array.isArray(arrayLiteral[arrayIndex])) && (i < node.left.indexNodes.length - 1)) {
                    context.throwError(`Cannot set invalid array element for array : ${node.left.name}`);
                }

                if ((Array.isArray(arrayLiteral[arrayIndex])) && (i < node.left.indexNodes.length - 1)) {
                    arrayLiteral = arrayLiteral[arrayIndex];
                }

                if (i === node.left.indexNodes.length - 1) {
                    arrayLiteral[arrayIndex] = context.evaluateNode(node.right);
                }
            } else {
                context.throwError(`Typeof index given for array ${node.name} must be a number`);
            }
        };
    }

    static getArrayLiteral (context, node) {
        const jekiNode = { name: node.left.name, operation: constants.GET_JEKI, };
        return context.evaluateNode(jekiNode);
    }

    static getValue (context, node) {
        const value = context.evaluateNode(node);
        if (value === undefined) context.throwError(`Cannot set value undefined to variable ${node.left}`);
        return value;
    }
}

module.exports = new INodeJeki();
