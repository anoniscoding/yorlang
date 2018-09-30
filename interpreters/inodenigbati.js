const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeNigbati extends IBase {

    interpreteNode(node) {
        while (this.evaluateNode(node.condition) !== constants.KW.IRO) {
            node.body.forEach(element => {
                this.evaluateNode(element);
            });
        }
    }
}

module.exports = new INodeNigbati();