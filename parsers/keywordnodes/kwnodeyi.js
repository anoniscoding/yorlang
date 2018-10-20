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
            yibody: [],
            padasi: []
        };

        this.pushToBlockTypeStack(constants.KW.YI);
        this.skipKeyword(constants.KW.YI);
        node.yivalue = bracketExpressionNl.getNode.call(this);
        this.skipPunctuation(constants.SYM.L_PAREN);

        while (this.lexer.isNotEndOfFile() && this.lexer.peek().value == constants.KW.EJO) {
            node.yibody.push(kwNodeEjo.getNode.call(this));
        }

        node = KwNodeYi.getYiNodeWithPadasi(this, node);
        this.skipPunctuation(constants.SYM.R_PAREN);
        this.popBlockTypeStack();

        return node;
    }

    static getYiNodeWithPadasi(context, node) {
        if (context.isKeyword(constants.KW.PADASI)) {
            context.skipKeyword(constants.KW.PADASI);
            context.skipPunctuation(constants.SYM.COLON);

            while (context.lexer.isNotEndOfFile() && context.lexer.peek().value !== constants.SYM.R_PAREN) {
                node.padasi.push(context.parseAst());
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
            ejobody: []
        }

        this.skipKeyword(constants.KW.EJO);
        node.ejovalue = this.parseExpression();
        this.skipPunctuation(constants.SYM.COLON);  

        while (KwNodeEjo.canParseEjoStatements(this)) {
            node.ejobody.push(this.parseAst());
        }

        return node;
    }

    static canParseEjoStatements(context) {
        return context.lexer.isNotEndOfFile() 
                        && context.lexer.peek().value !== constants.KW.EJO 
                        && context.lexer.peek().value !== constants.KW.PADASI  
                        && context.lexer.peek().value !== constants.SYM.R_PAREN;
    }
}

module.exports = new KwNodeYi();