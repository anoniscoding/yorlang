const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const variableTypes = require("./variabletypes");

class VariableNl extends BaseNode {

    getNode() { 
        const currentToken = this.lexer.next();

        const nextTokenValue = this.lexer.peek().value;
        if (variableTypes[nextTokenValue] != undefined) {
            return variableTypes[nextTokenValue].getNode.call(this, currentToken);
        }

        return {
            name: currentToken.value,
            operation: constants.GET_TI
        };
    }
}

module.exports = new VariableNl();