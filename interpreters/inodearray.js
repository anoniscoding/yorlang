const IBase = require("./ibase.js");
class INodeArray extends IBase {

    interpreteNode(arrayNode) {
        const arr = [];

        arrayNode.body.forEach(arrayItemNode => {
            arr.push(this.evaluateNode(arrayItemNode));
        });

        return arr;
    }
}

module.exports = new INodeArray();