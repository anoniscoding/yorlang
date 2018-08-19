const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpression = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeNigbati extends BaseNode {

    getNode() {
        this.skipKeyword(constants.KW.NIGBATI);

        return {
            operation: constants.KW.NIGBATI,
            condition: bracketExpression.getNode.call(this, false),
            body: this.parseBlock(constants.KW.NIGBATI)
        };
    }
}

module.exports = new KwNodeNigbati();