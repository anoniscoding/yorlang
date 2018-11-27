const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeWoke extends BaseNode {

    getNode() {        
        if (KwNodeWoke.isExpectedWokeStatement(this)) {
            return KwNodeWoke.getParsedWokeNode(this);
        }
        
        this.throwError("Yorlang woke keyword not expected in a non function(ise) block");
    }

    static isExpectedWokeStatement(context) {
        return context.getBlockTypeStack().indexOf(constants.KW.ISE) >= 0
    }

    static getParsedWokeNode(context) {
        context.skipKeyword(constants.KW.WOKE);
        const node = {};
        node.operation = constants.KW.WOKE;
        const varTokens = context.parseDelimited("`", "`", ",", context.getTokenThatSatisfiesPredicate.bind(context), (token) => token.type === constants.VARIABLE);
        node.varNames = [];
        varTokens.map(varToken => {
            node.varNames.push(varToken.value);
        });

        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }
}

module.exports = new KwNodeWoke();