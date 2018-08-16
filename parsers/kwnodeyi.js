const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeYi extends BaseKwNode {

    constructor() {
        super();
    }

    getNode() {
        this.kwNodeEjo = new KwNodeEjo().setParser(this.parser);
        const node = {
            operation: constants.KW.YI,
            yivalue: null,
            body: [],
            padasi: []
        };

        this.parser.skipKeyword(constants.KW.YI);
        node.yivalue = this.parser.parseBracketExpression();
        this.parser.skipPunctuation(constants.SYM.L_PAREN);

        while (this.parser.lexer.isNotEndOfFile() && this.parser.lexer.peek().value == constants.KW.EJO) {
            node.body.push(this.kwNodeEjo.getNode());
        }

        if (this.parser.isKeyword(constants.KW.PADASI)) {
            this.parser.skipKeyword(constants.KW.PADASI);
            this.parser.skipPunctuation(constants.SYM.COLON);

            while (this.parser.lexer.isNotEndOfFile() && this.parser.lexer.peek().value != constants.SYM.R_PAREN) {
                node.padasi.push(this.parser.parseAst());
            }
        }

        this.parser.skipPunctuation(constants.SYM.R_PAREN);

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

        this.parser.skipKeyword(constants.KW.EJO);
        node.ejovalue = this.parser.parseExpression();
        this.parser.skipPunctuation(constants.SYM.COLON);

        const canParseEjo = () =>  this.parser.lexer.isNotEndOfFile() 
                                        && this.parser.lexer.peek().value != constants.KW.EJO 
                                        && this.parser.lexer.peek().value != constants.KW.PADASI;
        

        while (canParseEjo()) {
            node.body.push(this.parser.parseAst());
        }

        return node;
    }
}

module.exports = new KwNodeYi();