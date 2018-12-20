const IBase = require("./ibase.js");
const WokeHelper = require("./helpers/woke_helper.js");
const feedbackMessages = require("../feedbackMessages.js");
const constants = require("../constants.js");

class INodeGetJeki extends IBase {
    interpreteNode (node) {
        for (let index = INodeGetJeki.getTopIndex(this, node.name); index >= 0; index--) {
            if (this.environment().getJeki(this.scopeStack()[index], node.name) !== undefined) {
                return this.environment().getJeki(this.scopeStack()[index], node.name);
            }
        }

        this.throwError(feedbackMessages.varDoesNotExist(constants.VARIABLE, node.name));
    }

    static getTopIndex (context, jekiName) {
        if (WokeHelper.isWokeVariable(context, jekiName)) {
            return context.scopeStack().length - 2;
        }

        return context.scopeStack().length - 1;
    }
}

module.exports = new INodeGetJeki();
