const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class ArrayNl extends BaseNode {

    getNode(arrayNameToken) {
        const node = {};

        if (arrayNameToken == undefined) { //it is an array literal e.g [1,2,3]
            node.operation = constants.ARRAY;
            node.body = this.parseDelimited( 
                constants.SYM.L_SQ_BRACKET , constants.SYM.R_SQ_BRACKET, constants.SYM.COMMA, 
                this.parseExpression.bind(this), null
            );
        } else { //it is an array element a[0]
            node.operation = constants.ARRAY_ELEM;
            node.name = arrayNameToken.value;
            this.skipPunctuation(constants.SYM.L_SQ_BRACKET);
            node.index = this.lexer.next().value;
            this.skipPunctuation(constants.SYM.R_SQ_BRACKET);
        }

        return node;
    }
}

module.exports = new ArrayNl();