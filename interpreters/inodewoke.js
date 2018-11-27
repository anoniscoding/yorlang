const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeWoke extends IBase {

    interpreteNode(node) {
        let woke = this.environment().getTi(this.getCurrentScope(), constants.KW.WOKE);

        if (woke == undefined) woke = node.varNames;
        else woke.push(...node.varNames);

        this.environment().setTi(this.getCurrentScope(), constants.KW.WOKE, woke);
    }
}

module.exports = new INodeWoke();