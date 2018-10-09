const IBase = require("./ibase.js");

class INodeYi extends IBase {

    interpreteNode(node) {
        const yivalue = this.evaluateNode(node.yivalue);
        
        for (let ejoIndex = 0; ejoIndex < node.yibody.length; ejoIndex++) {
            const doesEjoValueMatchYiValue = node.yibody[ejoIndex].ejovalue.value === yivalue;

            if (doesEjoValueMatchYiValue) {
                for (let i = 0; i < node.yibody[ejoIndex].ejobody.length; i++) {
                    this.evaluateNode(node.yibody[ejoIndex].ejobody[i]);
                }
                break;
            }

            const canRunPadasi = (ejoIndex === node.yibody.length - 1) && (node.padasi != undefined);
            if (canRunPadasi) {
                for (let padasiIndex = 0; padasiIndex < node.padasi.length; padasiIndex++) {
                    this.evaluateNode(node.padasi[padasiIndex]);
                }
            }
        }
    }
}

module.exports = new INodeYi();