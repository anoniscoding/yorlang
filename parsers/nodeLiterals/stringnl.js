const BaseNode = require("../basenode.js");

class StringNl extends BaseNode{

    getNode() {
        return this.parseLeaf();
    }
}

module.exports = new StringNl();