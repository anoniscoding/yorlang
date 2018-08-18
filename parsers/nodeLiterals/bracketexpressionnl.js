const BaseNodeLiteral = require("./basenl.js");
const constants = require("../../constants.js");

class BracketExpressionNl extends BaseNodeLiteral {

    getNodeLiteral(isArithmetic = true) {
        this.skipPunctuation(constants.SYM.L_BRACKET);
        this.isArithmeticExpression = isArithmetic;
        const node = this.parseExpression();
        this.isArithmeticExpression = true; //set back to default
        this.skipPunctuation(constants.SYM.R_BRACKET);

        return node;    
    }
}

module.exports = new BracketExpressionNl();