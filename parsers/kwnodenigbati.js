const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeNigbati extends BaseKwNode {

    getNode() {
        this.parser.skipKeyword(constants.KW.NIGBATI);

        return {
            operation: constants.KW.NIGBATI,
            condition: this.parser.parseBracketExpression(false),
            body: this.parser.parseBlock(constants.KW.NIGBATI)
        };
    }
}

module.exports = new KwNodeNigbati();