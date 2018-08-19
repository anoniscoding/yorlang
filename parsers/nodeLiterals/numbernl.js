const BaseNode = require("../basenode.js");

class NumberNl extends BaseNode {

    getNode() {
        return this.parseLeaf();
    }
}

module.exports = new NumberNl();