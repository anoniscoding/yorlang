const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const variableNlTypes = require("./variablenltypes");

class VariableNl extends BaseNode {

    getNode() { 
        const currentVarNameToken = this.lexer().next();

        const nextTokenValue = this.lexer().peek().value;
        if (variableNlTypes[nextTokenValue] != undefined) {
            const variableNlType = variableNlTypes[nextTokenValue];
            if (variableNlType instanceof BaseNode) return variableNlType.getNode.call(this, currentVarNameToken);
            else throw new Error(`Dependency ${variableNlType} must be of type BaseNode`);
        }

        return {
            name: currentVarNameToken.value,
            operation: constants.GET_TI
        };
    }
}

module.exports = new VariableNl();