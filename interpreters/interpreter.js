class Interpreter {

    constructor(astList){
        this.astList = astList;
    }

    getLeafValue(leaf) {
        if (leaf.value != null) {
            return leaf.value;
        }
    }

    interpreteNode(node) {
        if (this.getLeafValue(node) == undefined) {
            return registeredOperations[node.operation].operate.call(this)
        }

        return this.getLeafValue(node);
    }

    evaluateAst() {
        for (let i = 0; i < this.astList.length; i++) {
            this.interpreteNode(this.astList[i]);
        }
    }
}

module.exports = Interpreter;