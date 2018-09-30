const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeSe extends IBase {

    interpreteNode(node) {
        if (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            node.then.forEach(element => {
                this.evaluateNode(element);
            });
        } else {
            if (node.else != undefined) {
                node.else.forEach(element => {
                    this.evaluateNode(element);
                });
            }
        }
    }
}

module.exports = new INodeSe();