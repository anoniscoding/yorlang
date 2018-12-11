const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeWoke extends IBase {
    interpreteNode (node) {
        let woke = this.environment().getJeki(this.getCurrentScope(), constants.KW.WOKE);

        if (!woke) woke = node.varNames;
        else woke.push(...node.varNames);

        this.environment().setJeki(this.getCurrentScope(), constants.KW.WOKE, woke);
    }
}

module.exports = new INodeWoke();
