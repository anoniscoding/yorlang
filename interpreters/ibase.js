class IBase {

    constructor() {
        if (this.constructor == IBase) {
            throw new Error("Cannot instantiate abstract class IBase");
        }
    }

    interpreteNode() {
        throw new Error(`Class of type IBase must implement interpreteNode()`);
    }
}