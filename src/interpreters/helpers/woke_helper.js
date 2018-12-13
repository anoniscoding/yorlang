const constants = require("../../constants.js");

class WokeHelper {
    static isWokeVariable (context, jekiName) {
        const wokeList = context.environment().getJeki(context.getCurrentScope(), constants.KW.WOKE);
        return wokeList && wokeList.indexOf(jekiName) !== -1;
    }
}

module.exports = WokeHelper;
