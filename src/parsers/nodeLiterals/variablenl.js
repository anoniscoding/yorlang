const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const variableNlTypes = require("./variablenltypes");
const feedbackMessages = require("../../feedbackMessages.js");

class VariableNl extends BaseNode {
    getNode () {
        const varNameToken = this.lexer().next();

        const nextTokenValue = this.lexer().peek().value;
        if (variableNlTypes[nextTokenValue]) {
            const variableNlType = variableNlTypes[nextTokenValue];
            if (variableNlType instanceof BaseNode) return variableNlType.getNode.call(this, varNameToken);
            else throw new Error(feedbackMessages.baseNodeType(variableNlType));
        }

        return {
            operation: constants.GET_JEKI,
            name: varNameToken.value,
        };
    }
}

module.exports = new VariableNl();
