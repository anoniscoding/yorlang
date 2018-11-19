const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");
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

        if (this.isNextTokenKeyword(constants.KW.TABI)) {
            node.else = KwNodeSe.getTabiNode(this);
        }

        return node;
    }

    static getTabiNode(context) {
        context.skipKeyword(constants.KW.TABI);

        if (context.isNextTokenKeyword(constants.KW.SE)) { //cater for 'tabi se' block
            return new KwNodeSe().getNode.call(context);
        }

        return context.parseBlock(constants.KW.TABI);
    }

}

module.exports = new KwNodeSe();