const IBase = require("./ibase.js");

class INodeDivide extends IBase {

    interpreteNode(node) {
        const leftNodeValue =  this.evaluateNode(node.left)
        const rightNodeValue =  this.evaluateNode(node.right);
        if (rightNodeValue === 0) throw new Error("YorlangArithmeticException - cannot divide by zero");
        else return leftNodeValue / rightNodeValue;
    }
}

module.exports = new INodeDivide();