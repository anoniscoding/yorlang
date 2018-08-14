const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode.js");

class KwNodeKuro extends BaseKwNode {

    getNode() {
        const node = {
            operation: this.parser.lexer.next().value,
        };
        this.parser.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
        
        return node;
    }
}

module.exports = new KwNodeKuro();