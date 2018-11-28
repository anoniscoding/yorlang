const constants = require("../../constants.js");

class WokeHelper  {
    static isWokeVariable(context, tiName) {
        const wokeList = context.environment().getTi(context.getCurrentScope(), constants.KW.WOKE);
        return wokeList != undefined && wokeList.indexOf(tiName) != -1;
    }
}

module.exports = WokeHelper;