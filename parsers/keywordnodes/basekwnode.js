class BaseKwNode {

    //Make BaseKwNode act like an interface.
    constructor() {
        if (this.constructor == BaseKwNode) {
            throw new Error("Cannot instantiate abstract class BaseKwNode");
        }
    }

    getNode() {
        throw new Error(`Subclass must override getNode`);
    }
}

module.exports = BaseKwNode;