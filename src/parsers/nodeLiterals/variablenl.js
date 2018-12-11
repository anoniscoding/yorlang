const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const variableNlTypes = require("./variablenltypes");

class VariableNl extends BaseNode {
    getNode () {
        const varNameToken = this.lexer().next();

        const nextTokenValue = this.lexer().peek().value;
        if (variableNlTypes[nextTokenValue] != undefined) {
            const variableNlType = variableNlTypes[nextTokenValue];
            if (variableNlType instanceof BaseNode) return variableNlType.getNode.call(this, varNameToken);
            else throw new Error(`Dependency ${variableNlType} must be of type BaseNode`);
        }

        return {
            operation: constants.GET_JEKI,
            name: varNameToken.value,
        };
    }
}

module.exports = new VariableNl();
