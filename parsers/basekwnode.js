class BaseKwNode {

    //Make BaseKwNode act like an abstract class. Make the constructor private
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