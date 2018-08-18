const constants = require("../../constants.js");
const BaseKwNode = require("./basekwnode");
const bracketExpression = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeNigbati extends BaseKwNode {

    getNode() {
        this.skipKeyword(constants.KW.NIGBATI);

        return {
            operation: constants.KW.NIGBATI,
            condition: bracketExpression.getNodeLiteral.call(this, false),
            body: this.parseBlock(constants.KW.NIGBATI)
        };
    }
}

module.exports = new KwNodeNigbati();