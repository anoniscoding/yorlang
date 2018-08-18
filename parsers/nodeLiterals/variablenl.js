const constants = require("../../constants.js");
const BaseNodeLiteral = require("./basenl.js");
const variableTypes = require("./variabletypes");

class VariableNl extends BaseNodeLiteral {

    getNodeLiteral() { 
        const currentToken = this.lexer.next();

        const nextTokenValue = this.lexer.peek().value;
        if (variableTypes[nextTokenValue] != undefined) {
            return variableTypes[nextTokenValue].getNodeLiteral.call(this, currentToken);
        }

        return {
            name: currentToken.value,
            operation: constants.GET_TI
        };
    }
}

module.exports = new VariableNl();