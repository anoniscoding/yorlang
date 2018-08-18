class BaseNodeLiteral {

    //Make BaseKwNode act like an interface
    constructor() {
        if (this.constructor == BaseNodeLiteral) {
            throw new Error("Cannot instantiate abstract class BaseNodeLiteral");
        }
    }

    getNodeLiteral() {
        throw new Error(`Class of type BaseNodeLiteral must implement getNode()`);
    }
}

module.exports = BaseNodeLiteral;