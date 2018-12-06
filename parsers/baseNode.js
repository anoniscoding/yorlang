class BaseNode {

    //Make BaseNode act like an interface.
    constructor() {
        if (this.constructor === BaseNode) {
            throw new Error("Cannot instantiate abstract class BaseNode");
        }
    }

    getNode() {
        throw new Error(`Class of type BaseNode must implement getNode()`);
    }
}

module.exports = BaseNode;