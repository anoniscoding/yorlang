const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class CallIseNl extends BaseNode {

    getNode(token) {
        return {
            operation: constants.CALL_ISE,
            name: token.value,
            args: this.parseDelimited( 
                constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA, 
                this.parseExpression.bind(this), null
            )
        };
    }
}

module.exports = new CallIseNl();