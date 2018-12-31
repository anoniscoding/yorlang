const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class BracketExpressionNl extends BaseNode {
    getNode (config) {
        config = config || { isArithmeticExpression: true, isBracketExpected: true, };

        if (config.isBracketExpected) this.skipPunctuation(constants.SYM.L_BRACKET);
        this.setIsArithmeticExpression(config.isArithmeticExpression);
        const node = this.parseExpression();
        this.setIsArithmeticExpression(true); // set back to default
        if (config.isBracketExpected) this.skipPunctuation(constants.SYM.R_BRACKET);

        return node;
    }
}

module.exports = new BracketExpressionNl();
