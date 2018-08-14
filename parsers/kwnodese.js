const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeSe extends BaseKwNode {

    getNode() {
        this.parser.skipKeyword(constants.KW.SE);

        const node =  {
            operation: constants.KW.SE,
            condition: this.parser.parseBracketExpression(false),
            then: this.parser.parseBlock(constants.KW.SE),
        };

        if (this.parser.lexer.isNotEndOfFile() && this.parser.lexer.peek().value == constants.KW.TABI) {
            this.parser.skipKeyword(constants.KW.TABI);
            node.else = this.parser.parseBlock(constants.KW.TABI);
        }

        return node;
    }
}

module.exports = new KwNodeSe();