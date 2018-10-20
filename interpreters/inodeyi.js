const IBase = require("./ibase.js");

class INodeYi extends IBase {

    interpreteNode(node) {
        const yivalue = this.evaluateNode(node.yivalue);

        for (let ejoIndex = 0; ejoIndex < node.yibody.length; ejoIndex++) {
            if (INodeYi.isEjoValueMatchYiValue(this, node.yibody[ejoIndex], yivalue)) {
                INodeYi.runMatchedEjoBody(this, node.yibody[ejoIndex].ejobody);
                break;
            }

            if (INodeYi.canRunPadasi(ejoIndex, node)) {
                INodeYi.runPadasiCase(this, node.padasi);
            }
        }
    }

    static isEjoValueMatchYiValue(context, ejoCase, yivalue) {
        return context.evaluateNode(ejoCase.ejovalue) === yivalue;
    }

    static runMatchedEjoBody(context, ejoBody) {
        for (let i = 0; i < ejoBody.length; i++) {
            context.evaluateNode(ejoBody[i]);
        }
    }

    static canRunPadasi(ejoIndex, node) {
        return (ejoIndex === node.yibody.length - 1) && (node.padasi != undefined);
    }

    static runPadasiCase(context, padasiBody) {
        for (let padasiIndex = 0; padasiIndex < padasiBody.length; padasiIndex++) {
            context.evaluateNode(padasiBody[padasiIndex]);
        }
    }
}

module.exports = new INodeYi();