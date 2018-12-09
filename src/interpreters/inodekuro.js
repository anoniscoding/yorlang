const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeKuro extends IBase {

    interpreteNode(node) {
        return constants.KW.KURO;
    }
}

module.exports = new INodeKuro();