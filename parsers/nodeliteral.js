const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode.js");

class NodeLiteralType extends BaseKwNode {

    constructor() {
        this.nodeLiteralTypeTokens = {};
        this.registerNodeLiteralTypeToken
    }

    registerNodeLiteralTypeToken() {
        this.nodeLiteralTypeTokens[constants.VARIABLE] = this.parser.parseVariableLiteral.bind(this.parser);
        this.nodeLiteralTypeTokens[constants.NUMBER] = this.parser.parseLeaf.bind(this);
        this.nodeLiteralTypeTokens[constants.STRING] = this.parseLeaf.bind(this);
        this.nodeLiteralTypeTokens[constants.KEYWORD] = this.parseBool.bind(this);
        
        return node;
    }
}

module.exports = new NodeLiteralType();