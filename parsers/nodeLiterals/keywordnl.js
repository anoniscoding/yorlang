const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KeywordNl extends BaseNode {

    getNode() {
        //if keyword is boolean
        if ([constants.KW.OOTO, constants.KW.IRO].indexOf(this.lexer.peek().value) >= 0) {
            return this.parseLeaf();
        }
            
        this.lexer.throwError(`Expecting yorlang boolean(iró|òótó) but found ${token.value}`);
    }
}

module.exports = new KeywordNl();