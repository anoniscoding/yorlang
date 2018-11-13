const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");
let count = 0;
class KwNodeSe extends BaseNode {

    constructor() {
        super()
        if (!(bracketExpressionNl instanceof BaseNode)) {
            throw new Error("Dependency brackExpressionNl must be of type BaseNode");
        } 
    }

    getNode() {
        this.skipKeyword(constants.KW.SE);

        const node =  {};
        node.operation = constants.KW.SE;
        node.condition = bracketExpressionNl.getNode.call(this, false);
        node.then = this.parseBlock(constants.KW.SE);

        if (this.isKeyword(constants.KW.TABI)) {
            this.skipKeyword(constants.KW.TABI);

            if (this.isKeyword(constants.KW.SE)) { //cater for 'tabi se' block
                node.else = new KwNodeSe().getNode.call(this);
                return node;
            }

            node.else = this.parseBlock(constants.KW.TABI);
        }

        return node;
    }
}

module.exports = new KwNodeSe();