const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeIse extends BaseNode {

    getNode() {
        const isValidIseDeclaration = this.getBlockTypeStack().length == 0 ||
            this.peekBlockTypeStack() === constants.PROGRAM || this.peekBlockTypeStack() === constants.KW.ISE;

        if (!isValidIseDeclaration)
            this.lexer.throwError("Cannot create a yorlang function within a non function block");
        
        this.skipKeyword(constants.KW.ISE);

        return {
            operation: constants.KW.ISE,
            name: this.parseVarname(),
            varTokens: this.parseDelimited( 
                constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA,
                this.getTokenThatSatisfiesPredicate.bind(this), (token) => token.type === constants.VARIABLE
            ),
            body: this.parseBlock(constants.KW.ISE),
        };    
    }
}

module.exports = new KwNodeIse();