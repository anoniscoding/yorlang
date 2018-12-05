const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../node-literals/bracketexpressionnl.js");

class KwNodeNigbati extends BaseNode {

    constructor() {
        super();
        if (!(bracketExpressionNl instanceof BaseNode)) {
            throw new Error("Dependency bracketExpressionNl must be of type BaseNode");
        } 
    }

    getNode() {
        this.skipKeyword(constants.KW.NIGBATI);

        return {
            operation: constants.KW.NIGBATI,
            condition: bracketExpressionNl.getNode.call(this, false),
            body: this.parseBlock(constants.KW.NIGBATI)
        };
    }
}

module.exports = new KwNodeNigbati();