const constants = require("../../constants.js");
const BaseNode = require("../basenode.js");
const bracketExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeYi extends BaseNode {

    constructor() {
        super()
        if (!(bracketExpressionNl instanceof BaseNode)) {
            throw new Error("Dependency brackExpressionNl must extend BaseNode");
        } 
    }

    getNode() {
        const kwNodeEjo = new KwNodeEjo();
        const node = {
            operation: constants.KW.YI,
            yivalue: null,
            body: [],
            padasi: []
        };

        this.skipKeyword(constants.KW.YI);
        node.yivalue = bracketExpressionNl.getNode.call(this);
        this.skipPunctuation(constants.SYM.L_PAREN);

        while (this.lexer.isNotEndOfFile() && this.lexer.peek().value == constants.KW.EJO) {
            node.body.push(kwNodeEjo.getNode.call(this));
        }

        if (this.isKeyword(constants.KW.PADASI)) {
            this.skipKeyword(constants.KW.PADASI);
            this.skipPunctuation(constants.SYM.COLON);

            while (this.lexer.isNotEndOfFile() && this.lexer.peek().value != constants.SYM.R_PAREN) {
                node.padasi.push(this.parseAst());
            }
        }

        this.skipPunctuation(constants.SYM.R_PAREN);

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

        const canParseEjo = () =>  this.lexer.isNotEndOfFile() 
                                        && this.lexer.peek().value != constants.KW.EJO 
                                        && this.lexer.peek().value != constants.KW.PADASI;
        

        while (canParseEjo()) {
            node.body.push(this.parseAst());
        }

        return node;
    }
}

module.exports = new KwNodeYi();