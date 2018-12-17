const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class LeafNl extends BaseNode {
    getNode () {
        let negativeValue;

        if (this.lexer().peek().value === constants.SYM.MINUS) {
            negativeValue = LeafNl.getNegativeValue(this);
        }

        return {
            value: negativeValue || this.lexer().next().value,
            left: null,
            right: null,
            operation: null,
        };
    }

    static getNegativeValue (context) {
        context.skipOperator(constants.SYM.MINUS);
        return -parseFloat(context.lexer().next().value);
    }
}

module.exports = new LeafNl();
