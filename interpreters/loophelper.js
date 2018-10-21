const constants = require("../constants.js");

class LoopHelper {

    static runLoopBody(context, loopBody) {
        for (let i = 0; i < loopBody.length; i++) {
            const returnedValue = context.evaluateNode(loopBody[i]);
            if (returnedValue === constants.KW.KURO) return;
            if (returnedValue != undefined) return returnedValue;
        }            
    }
}

module.exports = LoopHelper;