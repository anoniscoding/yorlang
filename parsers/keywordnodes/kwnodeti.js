const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const variableTypes = require("../nodeLiterals/variabletypes.js");

class KwNodeTi extends BaseNode {

    getNode() {
        this.skipKeyword(constants.KW.TI);
               
        const varName = this.parseVarname();

        const node =  {};
        node.operation = constants.SYM.ASSIGN;
        node.left = KwNodeTi.getLeftNode(this, varName) || varName;
        this.skipOperator(constants.SYM.ASSIGN);
        node.right  = this.parseExpression();
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }

    static getLeftNode(context, varName) {
        const nextTokenValue = context.lexer.peek().value;

        //if current variable declaration is not a function call
        if (nextTokenValue != constants.SYM.L_BRACKET) {
            if (variableTypes[nextTokenValue] != undefined) { //current variable could be an array element or object property etc
                const variableType = variableTypes[nextTokenValue];
                if (variableType instanceof BaseNode) return variableType.getNode.call(context, {value: varName});
                else throw new Error(`Dependency ${variableType} must be of type BaseNode`);
            }
        }
    }
}

module.exports = new KwNodeTi();