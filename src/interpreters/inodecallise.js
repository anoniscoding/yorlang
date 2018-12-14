const IBase = require("./ibase.js");
const getFormattedInput = require("./helpers/helper_ise_adapter");

class INodeCallIse extends IBase {
    interpreteNode (node) {
        const iseNode = INodeCallIse.getIseNode(this, node.name);

        if (iseNode == null) {
            if (this.environment().isExistHelperIse(node.name)) { return getFormattedInput(this.environment().runHelperIse(node.name, INodeCallIse.getIseHelperParams(this, node.paramValues))); }

            this.throwError(`Ise ${node.name} is undefined`);
        }

        return INodeCallIse.startNewScope(this, iseNode, INodeCallIse.getResolvedParameterValues(this, node.paramValues));
    }

    static getIseNode (context, iseName) {
        for (let index = context.scopeStack().length - 1; index >= 0; index--) {
            if (context.environment().getIse(context.scopeStack()[index], iseName) !== undefined) {
                return context.environment().getIse(context.scopeStack()[index], iseName);
            }
        }
        return null;
    }

    static getIseHelperParams (context, paramNodeList) {
        const params = [];
        paramNodeList.forEach(paramNode => {
            params.push(context.evaluateNode(paramNode));
        });
        return params;
    }

    static getResolvedParameterValues (context, paramValueNodes) {
        const paramValues = [];
        paramValueNodes.forEach(paramValueNode => {
            paramValues.push(context.evaluateNode(paramValueNode));
        });

        return paramValues;
    }

    static startNewScope (context, iseNode, paramValues) {
        context.pushToScopeStack(iseNode.name);
        INodeCallIse.setIseNodeParam(context, iseNode.paramTokens, paramValues);
        const returnedValue = INodeCallIse.runIseNodeBody(context, iseNode.body);
        context.popFromScopeStack();

        return returnedValue;
    }

    static setIseNodeParam (context, iseNodeParamTokens, iseParamValues) {
        for (let i = 0; i < iseNodeParamTokens.length; i++) {
            context.environment().setJeki(context.getCurrentScope(), iseNodeParamTokens[i].value, iseParamValues[i]);
        }
    }

    static runIseNodeBody (context, iseNodeBody) {
        for (let i = 0; i < iseNodeBody.length; i++) {
            const returnedValue = context.evaluateNode(iseNodeBody[i]);
            if (returnedValue !== undefined) return returnedValue;
        }
    }
}

module.exports = new INodeCallIse();
