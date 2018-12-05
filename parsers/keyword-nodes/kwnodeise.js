const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeIse extends BaseNode {

    getNode() {
        if (KwNodeIse.isExpectedIseDeclaration(this)) {
            return KwNodeIse.getParsedIseNode(this);
        }
        
        this.throwError("Cannot create a yorlang function within a non function block");   
    }

    static isExpectedIseDeclaration(context) {
        return context.getBlockTypeStack().length == 0 || context.peekBlockTypeStack() === constants.PROGRAM 
                                                    || context.peekBlockTypeStack() === constants.KW.ISE;
    }

    static getParsedIseNode(context) {
        context.skipKeyword(constants.KW.ISE);

        return {
            operation: constants.KW.ISE,
            name: context.parseVarname(),
            paramTokens: context.parseDelimited( 
                constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA,
                context.getTokenThatSatisfiesPredicate.bind(context), (token) => token.type === constants.VARIABLE
            ),
            body: context.parseBlock(constants.KW.ISE),
        };
    }
}

module.exports = new KwNodeIse();