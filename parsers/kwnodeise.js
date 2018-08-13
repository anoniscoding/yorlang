const constants = require("../constants.js");
const BaseKwNode = require("./basekwnode");

class KwNodeIse extends BaseKwNode {

    getNode() {
        if (this.parser.isBlockType() && this.parser.getCurrentBlockType() != constants.KW.ISE)
            this.lexer.throwError("Cannot create a yorlang function within a non function block");
        
        return this.parseNode();
    }

    parseNode() {
        this.parser.skipKeyword(constants.KW.ISE);

        return {
            operation: constants.KW.ISE,
            name: this.parser.parseVarname(),
            vars: this.parser.delimited( 
                constants.SYM.L_BRACKET , constants.SYM.R_BRACKET, constants.SYM.COMMA, 
                this.parser.parseIseVarsOrValues.bind(this.parser), (token) => {return token.type == constants.VARIABLE;
            }),
            body: this.parser.parseBlock(constants.KW.ISE),
        };
    }
}

module.exports = new KwNodeIse();