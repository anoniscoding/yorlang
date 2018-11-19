const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");


class ArrayNl extends BaseNode {

    getNode(arrayNameToken) {
        if (arrayNameToken == undefined) {
            return ArrayNl.getParsedArrayLiteral(this);
        } else { 
            return ArrayNl.getParsedArrayElement(this, arrayNameToken);
        }
    }

    static getParsedArrayLiteral(context) {
        const node = {};

        node.operation = constants.ARRAY;
        node.body = context.parseDelimited( 
            constants.SYM.L_SQ_BRACKET , constants.SYM.R_SQ_BRACKET, constants.SYM.COMMA, 
            context.parseExpression.bind(context), null
        );

        return node;
    }

    static getParsedArrayElement(context, arrayNameToken) {
        const node = {};
        node.operation = constants.ARRAY_ELEM;
        node.name = arrayNameToken.value;
        context.skipPunctuation(constants.SYM.L_SQ_BRACKET);
        node.index = context.parseExpression();
        context.skipPunctuation(constants.SYM.R_SQ_BRACKET);

        return node;
    }
}

module.exports = new ArrayNl();