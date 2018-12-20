const constants = require("../../constants.js");
const leafNl = require("./leafnl.js");
const BaseNode = require("../basenode.js");
const feedbackMessages = require("../../feedbackMessages.js");

class KeywordNl extends BaseNode {
    constructor () {
        super();
        if (!(leafNl instanceof BaseNode)) {
            throw new Error(feedbackMessages.baseNodeType("Dependency leafnl"));
        }
    }

    getNode () {
        if (KeywordNl.isBooleanKeywordNl(this)) {
            return leafNl.getNode.call(this);
        }

        this.throwError(feedbackMessages.expectBooleanMsg());
    }

    static isBooleanKeywordNl (context) {
        return [ constants.KW.OOTO, constants.KW.IRO, ].includes(context.lexer().peek().value);
    }
}

module.exports = new KeywordNl();
