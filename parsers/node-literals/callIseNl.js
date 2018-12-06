const BaseNode = require("../baseNode.js");
const constants = require("../../constants.js");

class CallIseNl extends BaseNode {

    /*
     * Whenever iseNameToken is provided, then the function call is being used in an expression
     * e.g jeki a = sum(1,2);
     * Whenever iseNameToken is not provided, then the function call is not being used in an expression
     * e.g printName("femi");
    */

    getNode(iseNameToken) {
        iseNameToken = iseNameToken || {};

        const node = {};
        node.operation = constants.CALL_ISE;
        node.name = iseNameToken.value || this.lexer().next().value;
        node.paramValues = this.parseDelimited( 
                constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA, 
                this.parseExpression.bind(this), null
        );

        if (iseNameToken.value == undefined) this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
        
        return node;
    }
}

module.exports = new CallIseNl();