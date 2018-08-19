const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class BracketExpressionNl extends BaseNode {

    getNode(isArithmetic = true) {
        this.skipPunctuation(constants.SYM.L_BRACKET);
        this.setIsArithmeticExpression(isArithmetic);
        const node = this.parseExpression();
        this.setIsArithmeticExpression(true); //set back to default
        this.skipPunctuation(constants.SYM.R_BRACKET);

        return node;    
    }
}

module.exports = new BracketExpressionNl();