const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class NegativeNl extends BaseNode {
    getNode () {
        this.skipOperator(constants.SYM.MINUS);

        return {
            operation: constants.NEGATE_EXPRESSION,
            body: this.parseExpression(),
        };
    }
}

module.exports = new NegativeNl();
