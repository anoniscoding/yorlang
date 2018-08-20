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
        //if keyword is boolean
        if ([constants.KW.OOTO, constants.KW.IRO].indexOf(this.lexer.peek().value) >= 0) {
            return leafNl.getNode.call(this);
        }
            
        this.lexer.throwError(`Expecting yorlang boolean(iró|òótó) but found ${token.value}`);
    }
}

module.exports = new KeywordNl();