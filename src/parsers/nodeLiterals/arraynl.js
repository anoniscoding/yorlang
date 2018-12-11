const BaseNode = require("../basenode.js");
const constants = require("../../constants.js");

class ArrayNl extends BaseNode {
    getNode (arrayNameToken) {
        return (!arrayNameToken) ? ArrayNl.getParsedArrayLiteral(this)
            : ArrayNl.getParsedArrayElement(this, arrayNameToken);
    }

    static getParsedArrayLiteral (context) {
        const node = {};
        node.operation = constants.ARRAY;
        node.body = context.parseDelimited(
            constants.SYM.L_SQ_BRACKET, constants.SYM.R_SQ_BRACKET, constants.SYM.COMMA,
            context.parseExpression.bind(context), null
        );

        return node;
    }

    static getParsedArrayElement (context, arrayNameToken) {
        const node = {};
        node.operation = constants.ARRAY_ELEM;
        node.name = arrayNameToken.value;
        node.indexNodes = ArrayNl.getArrayElementIndexNodes(context);

        return node;
    }

    static getArrayElementIndexNodes (context) {
        const indexNodes = [ ArrayNl.getArrayElementIndexNode(context), ];

        while (context.isNextTokenPunctuation(constants.SYM.L_SQ_BRACKET)) { // handles multi-dimensional array element
            indexNodes.push(ArrayNl.getArrayElementIndexNode(context));
        }

        return indexNodes;
    }

    static getArrayElementIndexNode (context) {
        let indexNode = { operation: null, right: null, left: null, value: "", };

        context.skipPunctuation(constants.SYM.L_SQ_BRACKET);
        if (ArrayNl.isNotEmptyArrayIndex(context)) indexNode = context.parseExpression();
        context.skipPunctuation(constants.SYM.R_SQ_BRACKET);

        return indexNode;
    }

    static isNotEmptyArrayIndex (context) {
        return context.lexer().peek().value !== constants.SYM.R_SQ_BRACKET;
    }
}

module.exports = new ArrayNl();
