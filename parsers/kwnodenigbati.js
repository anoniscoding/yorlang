const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeNigbati extends BaseKwNode {

    getNode() {
        this.skipKeyword(constants.KW.NIGBATI);

        return {
            operation: constants.KW.NIGBATI,
            condition: this.parseBracketExpression(false),
            body: this.parseBlock(constants.KW.NIGBATI)
        };
    }
}

module.exports = new KwNodeNigbati();