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
        if (KeywordNl.isKeywordNl(this)) {
            return leafNl.getNode.call(this);
        }
            
        this.throwError(`Expecting yorlang keyword value e.g boolean(iró|òótó) but found ${token.value}`);
    }

    static isKeywordNl(context) {
        return [constants.KW.OOTO, constants.KW.IRO].indexOf(context.lexer().peek().value) >= 0
    }
}

module.exports = new KeywordNl();