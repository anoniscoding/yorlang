const BaseNode = require("../basenode.js");

class LeafNl extends BaseNode{

    getNode() {
        return {
            value: this.lexer().next().value,
            left: null,
            right: null,
            operation: null
        }    
    }
}

module.exports = new LeafNl();