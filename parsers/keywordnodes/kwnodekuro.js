const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");

class KwNodeKuro extends BaseNode {

    getNode() {
        
        const node = {
            operation: this.lexer.next().value,
        };
        this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
        
        return node;
    }
}

module.exports = new KwNodeKuro();