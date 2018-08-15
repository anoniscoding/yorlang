class BaseKwNode {

    //Make BaseKwNode act like an abstract class. Make the constructor private
    constructor() {
        if (this.constructor == BaseKwNode) {
            throw new Error("Cannot instantiate abstract class BaseKwNode");
        }
    }
    
    setParser(parser) {
        this.parser = parser;
        return this;
    }

    //Child classes must override this method
    getNode() {
        throw new Error(`${this.constructor.name} must override getNode`);
    }
}

module.exports = BaseKwNode;