const constants = require("../../constants.js");
const BaseNode = require("../baseNode.js");

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
        node.varNames = KwNodeWoke.getWokeVarNames(context);
        context.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);

        return node;
    }

    static getWokeVarNames(context) {
        const varTokens = context.parseDelimited("`", "`", ",", context.getTokenThatSatisfiesPredicate.bind(context), (token) => token.type === constants.VARIABLE);
        const varNames = [];
        varTokens.map(varToken => {
            varNames.push(varToken.value);
        });

        return varNames;
    }
}

module.exports = new KwNodeWoke();