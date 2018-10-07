const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeYi extends BaseNode {

    constructor() {
        super()
        if (!(bracketExpressionNl instanceof BaseNode)) {
            throw new Error("Dependency brackExpressionNl must be of type BaseNode");
        } 
    }

    getNode() {
        const kwNodeEjo = new KwNodeEjo();
        let node = {
            operation: constants.KW.YI,
            yivalue: null,
            body: [],
            padasi: []
        };

        this.blockTypeStack.push(constants.KW.YI);
        this.skipKeyword(constants.KW.YI);
        node.yivalue = bracketExpressionNl.getNode.call(this);
        this.skipPunctuation(constants.SYM.L_PAREN);

        while (this.lexer.isNotEndOfFile() && this.lexer.peek().value == constants.KW.EJO) {
            node.body.push(kwNodeEjo.getNode.call(this));
        }

        node = this.getYiNodeWithPadasi(node);
        this.skipPunctuation(constants.SYM.R_PAREN);
        this.blockTypeStack.pop();

        return node;
    }

    getYiNodeWithPadasi(node) {
        if (this.isKeyword(constants.KW.PADASI)) {
            this.skipKeyword(constants.KW.PADASI);
            this.skipPunctuation(constants.SYM.COLON);

            while (this.lexer.isNotEndOfFile() && this.lexer.peek().value != constants.SYM.R_PAREN) {
                node.padasi.push(this.parseAst());
            }
        }

        return node;
    }
}

class KwNodeEjo extends BaseNode {

    getNode() {
        const node = {
            operation: constants.KW.EJO,
            ejovalue: null,
            body: []
        }

        this.skipKeyword(constants.KW.EJO);
        node.ejovalue = this.parseExpression();
        this.skipPunctuation(constants.SYM.COLON);

        const canParseEjoStatements = () =>  this.lexer.isNotEndOfFile() 
                                        && this.lexer.peek().value != constants.KW.EJO 
                                        && this.lexer.peek().value != constants.KW.PADASI;
        

        while (canParseEjoStatements()) {
            node.body.push(this.parseAst());
        }

        return node;
    }
}

module.exports = new KwNodeYi();