const constants = require("../../constants.js");
const BaseKwNode = require("./basekwnode");
const brackExpressionNl = require("../nodeLiterals/bracketexpressionnl.js");

class KwNodeYi extends BaseKwNode {

    constructor() {
        super();
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
        node.yivalue = brackExpressionNl.getNodeLiteral.call(this);
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

class KwNodeEjo extends BaseKwNode {

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