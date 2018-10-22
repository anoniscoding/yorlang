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
        const node = {};
        node.operation = constants.KW.YI;
        this.pushToBlockTypeStack(constants.KW.YI);
        this.skipKeyword(constants.KW.YI);
        node.yivalue = bracketExpressionNl.getNode.call(this);
        this.skipPunctuation(constants.SYM.L_PAREN);
        node.yibody = KwNodeYi.getYiBody(this);        
        node.padasi = KwNodeYi.getPadasi(this);
        this.skipPunctuation(constants.SYM.R_PAREN);
        this.popBlockTypeStack(); //a

        return node;
    }

    static getYiBody(context) {
        const yiBody = [], kwNodeEjo = new KwNodeEjo();

        while (context.lexer.isNotEndOfFile() && context.lexer.peek().value == constants.KW.EJO) {
            yiBody.push(kwNodeEjo.getNode.call(context));
        }

        return yiBody;
    }

    static getPadasi(context) {
        const padasi = [];

        if (context.isKeyword(constants.KW.PADASI)) {
            context.skipKeyword(constants.KW.PADASI);
            context.skipPunctuation(constants.SYM.COLON);

            while (context.lexer.isNotEndOfFile() && context.lexer.peek().value !== constants.SYM.R_PAREN) {
                padasi.push(context.parseAst());
            }
        }

        return padasi;
    }
}

class KwNodeEjo extends BaseNode {

    getNode() {
        const node = {};
        node.operation = constants.KW.EJO;
        this.skipKeyword(constants.KW.EJO);
        node.ejovalue = this.parseExpression();
        this.skipPunctuation(constants.SYM.COLON);  
        node.ejobody = KwNodeEjo.getEjoBody(this);

        return node;
    }

    static getEjoBody(context) {
        const ejoBody = [];

        while (KwNodeEjo.canParseEjoStatements(context)) {
            ejoBody.push(context.parseAst());
        }
        
        return ejoBody;
    }

    static canParseEjoStatements(context) {
        return context.lexer.isNotEndOfFile() 
                        && context.lexer.peek().value !== constants.KW.EJO 
                        && context.lexer.peek().value !== constants.KW.PADASI  
                        && context.lexer.peek().value !== constants.SYM.R_PAREN;
    }
}

module.exports = new KwNodeYi();