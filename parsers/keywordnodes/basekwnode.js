class BaseKwNode {

    //Make BaseKwNode act like an interface.
    constructor() {
        if (this.constructor == BaseKwNode) {
            throw new Error("Cannot instantiate abstract class BaseKwNode");
        }
    }

    getNode() {
        throw new Error(`Class of type BaseKwNode must implement getNode()`);
    }
}

module.exports = BaseKwNode;