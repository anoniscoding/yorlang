const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KwNodeWoke extends BaseNode {
    getNode () {
        if (KwNodeWoke.isExpectedWokeStatement(this)) {
            return KwNodeWoke.getParsedWokeNode(this);
        }

        this.throwError(feedbackMessages.unexpectedDeclaration(constants.KW.WOKE));
    }

    static isExpectedWokeStatement (context) {
        return context.getBlockTypeStack().includes(constants.KW.ISE);
    }

    static getParsedWokeNode (context) {
        context.skipKeyword(constants.KW.WOKE);
        const node = {};
        node.operation = constants.KW.WOKE;
        node.varNames = KwNodeWoke.getWokeVarNames(context);
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }

    static getWokeVarNames (context) {
        const varTokens = context.parseDelimited("`", "`", ",", context.getTokenThatSatisfiesPredicate.bind(context), (token) => token.type === constants.VARIABLE);
        const varNames = [];
        varTokens.map(varToken => {
            varNames.push(varToken.value);
        });

        return varNames;
    }
}

module.exports = new KwNodeWoke();
