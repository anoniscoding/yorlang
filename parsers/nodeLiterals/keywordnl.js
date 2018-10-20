const constants = require("../../constants.js");
const leafNl = require("./leafnl.js");
const BaseNode = require("../basenode.js");

class KeywordNl extends BaseNode {

    constructor() {
        super()
        if (!(leafNl instanceof BaseNode)) {
            throw new Error("Dependency leafNl must be of type BaseNode");
        } 
    }

    getNode() {
        if (KeywordNl.isBooleanKeywordNl(this)) {
            return leafNl.getNode.call(this);
        }
            
        this.lexer.throwError(`Expecting yorlang boolean(iró|òótó) but found ${token.value}`);
    }

    static isBooleanKeywordNl(context) {
        return [constants.KW.OOTO, constants.KW.IRO].indexOf(context.lexer.peek().value) >= 0
    }
}

module.exports = new KeywordNl();