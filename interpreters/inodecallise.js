const IBase = require("./ibase.js");
const constants = require("../constants.js");

class INodeCallIse extends IBase {

    interpreteNode(node) {
        const iseNode = INodeCallIse.getIseNode(this, node.name);

        if (iseNode == null) {
            //try running isename from yorlang helper functions list
            const returnedValue = this.environment().runHelperIse(node.name, INodeCallIse.getIseHelperParams(this, node.paramValues));
            if (returnedValue === constants.KW.IRO) throw new Error(`Ise ${node.name} is undefined`);
            
            return returnedValue
        }

        this.pushToScopeStack(iseNode.name);
        INodeCallIse.setIseNodeParam(this, iseNode.paramTokens, node.paramValues);
        const returnedValue = INodeCallIse.runIseNodeBody(this, iseNode.body); 
        this.popFromScopeStack();

        return returnedValue; //return the value that is returned by an encountered pada statement within an ise body
    }

    static getIseNode(context, iseName) {
        for (let index = context.scopeStack().length - 1; index >= 0; index--) {
            if (context.environment().getIse(context.scopeStack()[index], iseName) != undefined) {
                return context.environment().getIse(context.scopeStack()[index], iseName);
            }
        }
        return null
    }

    static getIseHelperParams(context, params) {
        const _params = [];
        params.forEach(param => {
            _params.push(context.evaluateNode(param))
        });
        return _params;
    }

    static setIseNodeParam(context, iseNodeParamTokens, iseNodeParamValues) {
        for (let i = 0; i < iseNodeParamTokens.length; i++) {
            context.environment().setTi(context.getCurrentScope(), iseNodeParamTokens[i].value, context.evaluateNode(iseNodeParamValues[i]));
        }
    }

    static runIseNodeBody(context, iseNodeBody) {
        for (let i = 0; i < iseNodeBody.length; i++) {
            const returnedValue = context.evaluateNode(iseNodeBody[i]);
            if (returnedValue != undefined) return returnedValue;
        }
    }
}

module.exports = new INodeCallIse();