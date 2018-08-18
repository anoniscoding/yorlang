class BaseNodeLiteral {

    //Make BaseKwNode act like an interface
    constructor() {
        if (this.constructor == BaseNodeLiteral) {
            throw new Error("Cannot instantiate abstract class BaseNodeLiteral");
        }
    }

    getNodeLiteral() {
        throw new Error(`Subclass must override getNodeLiteral`);
    }
}

module.exports = BaseNodeLiteral;