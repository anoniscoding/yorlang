const IBase = require("./ibase.js");

class INodeArray extends IBase {

    interpreteNode(node) {
        const arr = [];
        node.body.forEach(element => {
            arr.push(element.value);
        });

        return arr;
    }
}

module.exports = new INodeArray();