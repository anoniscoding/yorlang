const IBase = require("./ibase.js");
const contansts = require("../constants.js");

class INodeArrayElement extends IBase {

    interpreteNode(node) {
        const tiNode = {name: node.name, operation: contansts.GET_TI}
        const arrayLiteral = this.evaluateNode(tiNode);
        const index = this.evaluateNode(node.index);
        
        if (typeof index == "number") {
            return arrayLiteral[index];
        }
    }
}

module.exports = new INodeArrayElement();