const IBase = require("./ibase.js");
const constants = require("../constants.js");
const iNodeGetTi = require("./inodegetti.js");
class INodeArray extends IBase {

    interpreteNode(arrayNode) {
        const arr = []; const iNodeArray = new INodeArray();

        arrayNode.body.forEach(arrayItemNode => {
            switch (arrayItemNode.operation) {
                case constants.GET_TI :
                    arr.push(iNodeGetTi.interpreteNode.call(this, arrayItemNode)); break;
                case constants.ARRAY : //for multidimensional arrays
                    arr.push(iNodeArray.interpreteNode.call(this,arrayItemNode)); break;
                case constants.ARRAY_ELEM :
                    const arrayLiteral = iNodeGetTi.interpreteNode.call(this, arrayItemNode);
                    arr.push(arrayLiteral[arrayItemNode.index]); break;
                default : //array item is a string/num/float
                    arr.push(arrayItemNode.value);
            }
        });

        return arr;
    }
}

module.exports = new INodeArray();