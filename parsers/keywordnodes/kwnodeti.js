const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const variableNlTypes = require("../nodeLiterals/variablenltypes.js");

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

        //if current variable initialization is not a function call
        if (nextTokenValue != constants.SYM.L_BRACKET) {
            if (variableNlTypes[nextTokenValue] != undefined) { //current variable could be an array element or object property etc
                const variableNlType = variableNlTypes[nextTokenValue];
                if (variableNlType instanceof BaseNode) return variableNlType.getNode.call(context, {value: varName});
                else throw new Error(`Dependency ${variableNlType} must be of type BaseNode`);
            }
        }
    }
}

module.exports = new KwNodeTi();