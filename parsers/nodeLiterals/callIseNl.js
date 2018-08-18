const BaseNodeLiteral = require("./basenl.js");
const constants = require("../../constants.js");

class CallIseNl extends BaseNodeLiteral {

    getNodeLiteral(token) {
        return {
            operation: constants.CALL_ISE,
            name: token.value,
            args: this.parseDelimited( 
                constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA, 
                this.getTokenThatSatisfiesPredicate.bind(this), this.isNumStringVariable.bind(this)
            )
        };
    }
}

module.exports = new CallIseNl();