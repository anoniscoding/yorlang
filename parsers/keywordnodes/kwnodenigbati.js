const constants = require("../../constants.js");
const BaseKwNode = require("./basekwnode");
const brackExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeNigbati extends BaseKwNode {

    getNode() {
        this.skipKeyword(constants.KW.NIGBATI);

        return {
            operation: constants.KW.NIGBATI,
            condition: brackExpressionNl.getNodeLiteral.call(this, false),
            body: this.parseBlock(constants.KW.NIGBATI)
        };
    }
}

module.exports = new KwNodeNigbati();