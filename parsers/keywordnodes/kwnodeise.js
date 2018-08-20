const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeIse extends BaseNode {

    getNode() {
        if (this.isBlockType() && this.getCurrentBlockType() != constants.KW.ISE)
            this.lexer.throwError("Cannot create a yorlang function within a non function block");
        
        this.skipKeyword(constants.KW.ISE);

        return {
            operation: constants.KW.ISE,
            name: this.parseVarname(),
            vars: this.parseDelimited( 
                constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA, 
                this.getTokenThatSatisfiesPredicate.bind(this), (token) => token.type == constants.VARIABLE
            ),
            body: this.parseBlock(constants.KW.ISE),
        };    
    }
}

module.exports = new KwNodeIse();