const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const leafnl = require("../nodeLiterals/leafnl.js");
const path = require("path");

class KwNodeGbeWole extends BaseNode {

    getNode() {
        this.skipKeyword(constants.KW.GBE_WOLE);
        const node =  {};
        node.operation = constants.KW.GBE_WOLE;
        
        if (this.lexer().peek().type == constants.STRING) {
            node.path = leafnl.getNode.call(this);
            if (path.extname(node.path.value) != constants.YL_EXT) 
                this.throwError("Invalid yorlang file. Expected file with .yl extension");

            this.skipPunctuation(constants.SYM.STATEMENT_TERMINATOR);
            return node;
        }
        
        this.lexer().throwError(`${constants.KW.GBE_WOLE} expects a string.`);
    }
}

module.exports = new KwNodeGbeWole();