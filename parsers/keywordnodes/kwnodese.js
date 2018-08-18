const constants = require("../../constants.js");
const BaseKwNode = require("./basekwnode");
const bracketExpression = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeSe extends BaseKwNode {

    getNode() {
        this.skipKeyword(constants.KW.SE);

        const node =  {
            operation: constants.KW.SE,
            condition: bracketExpression.getNodeLiteral.call(this, false),
            then: this.parseBlock(constants.KW.SE),
        };

        if (this.lexer.isNotEndOfFile() && this.lexer.peek().value == constants.KW.TABI) {
            this.skipKeyword(constants.KW.TABI);
            node.else = this.parseBlock(constants.KW.TABI);
        }

        return node;
    }
}

module.exports = new KwNodeSe();