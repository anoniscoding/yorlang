const IBase = require("./ibase.js");

class INodeYi extends IBase {
    interpreteNode (node) {
        const yivalue = this.evaluateNode(node.yivalue);

        for (let IRUIndex = 0; IRUIndex < node.yibody.length; IRUIndex++) {
            if (INodeYi.isIRUValueMatchYiValue(this, node.yibody[IRUIndex].IRUvalue, yivalue)) {
                return INodeYi.runMatchedBody(this, node.yibody[IRUIndex].IRUbody);
            }

            if (INodeYi.canRunPadasi(IRUIndex, node)) {
                return INodeYi.runMatchedBody(this, node.padasi);
            }
        }
    }

    static isIRUValueMatchYiValue (context, IRUvalueNode, yivalue) {
        return context.evaluateNode(IRUvalueNode) === yivalue;
    }

    static runMatchedBody (context, body) {
        for (let i = 0; i < body.length; i++) {
            const returnedValue = context.evaluateNode(body[i]);
            if (returnedValue !== undefined) return returnedValue; // it's an ise pada value or kuro statement
        }
    }

    static canRunPadasi (IRUIndex, node) {
        return (IRUIndex === node.yibody.length - 1) && (node.padasi !== undefined);
    }
}

module.exports = new INodeYi();
