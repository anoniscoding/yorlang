const constants = require("../../constants.js");
const BaseNodeLiteral = require("./basenl.js");

class BooleanNl extends BaseNodeLiteral {

    getNodeLiteral() { 
        const currentToken = this.lexer.next();

        //if current variable is a function call
        if (this.lexer.peek().value == constants.SYM.L_BRACKET) {
            return this.parseCallIse(currentToken);
        }

        //if current variable is an array element
        if (this.lexer.peek().value === constants.SYM.L_SQ_BRACKET) {
            return this.parseArray(currentToken);
        }

        let node =  {
            name: currentToken.value,
            operation: constants.GET_TI
        };

        return node;
    }
}

module.exports = new BooleanNl();