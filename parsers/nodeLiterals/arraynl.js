const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class ArrayNl extends BaseNode {

    getNode(arrayNameToken) {
        let node = {};
        node.operation = constants.ARRAY;

        if (arrayNameToken == undefined) { //it is an array literal e.g [1,2,3]
            node.body = this.parseDelimited( 
                constants.SYM.L_SQ_BRACKET , constants.SYM.R_SQ_BRACKET, constants.SYM.COMMA, 
                this.getTokenThatSatisfiesPredicate.bind(this), this.isNumStringVariable.bind(this)
            );
        } else { //it is an array element a[0]
            node.name = arrayNameToken.value;
            this.skipPunctuation(constants.SYM.L_SQ_BRACKET);
            node.index = this.lexer.next().value;
            this.skipPunctuation(constants.SYM.R_SQ_BRACKET);
        }

        return node;
    }
}

module.exports = new ArrayNl();