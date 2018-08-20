const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const variableTypes = require("./variabletypes");

class VariableNl extends BaseNode {

    getNode() { 
        const currentToken = this.lexer.next();

        const nextTokenValue = this.lexer.peek().value;
        if (variableTypes[nextTokenValue] != undefined) {
            const variableType = variableTypes[nextTokenValue];
            if (variableType instanceof BaseNode) return variableType.getNode.call(this, currentToken);
            else throw new Error(`Dependency ${variableType} must be of type BaseNode`);
        }

        return {
            name: currentToken.value,
            operation: constants.GET_TI
        };
    }
}

module.exports = new VariableNl();