const constants = require("../../constants.js");
const BaseNodeLiteral = require("./basenl.js");
const arrayNl = require("./arraynl.js");
const callIseNl = require("./callIseNl.js");

class VariableNl extends BaseNodeLiteral {

    getNodeLiteral() { 
        const currentToken = this.lexer.next();

        //if current variable is a function call
        if (this.lexer.peek().value == constants.SYM.L_BRACKET) {
            return callIseNl.getNodeLiteral.call(this, currentToken);
        }

        //if current variable is an array element
        if (this.lexer.peek().value === constants.SYM.L_SQ_BRACKET) {
            return arrayNl.getNodeLiteral.call(this, currentToken);
        }

        //TODO figure out how to throw error when code is running in a block and we have something like name;
        let node =  {
            name: currentToken.value,
            operation: constants.GET_TI
        };

        return node;
    }
}

module.exports = new VariableNl();