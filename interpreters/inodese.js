const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeSe extends IBase {

    interpreteNode(node) {
        if (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            for (let i = 0; i < node.then.length; i++) {
                const returnedValue = this.evaluateNode(node.then[i]);
                if (returnedValue === constants.KW.KURO) return constants.KW.KURO;
                else if (returnedValue != undefined) return returnedValue; //it's an ise return (or pada) value
            }
        } else {
            if (node.else != undefined) {
                for (let i = 0; i < node.else.length; i++) {
                    const returnedValue = this.evaluateNode(node.else[i]);
                    if (returnedValue === constants.KW.KURO) return constants.KW.KURO;
                    else if (returnedValue != undefined) return returnedValue;
                }
            }
        }
    }
}

module.exports = new INodeSe();