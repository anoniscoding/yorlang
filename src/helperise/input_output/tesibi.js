const readlineSync = require("readline-sync");

// Takes command line input
function teSibi (args) {
    if (args instanceof Array) {
        const [ param, ] = args;
        if (typeof param === "string") {
            const input = readlineSync.question(param);
            return parseFloat(input) || input;
        }

        throw new Error("Invalid param given to helper ise teSibi.");
    }

    throw new Error("Yorlang system error");
}

module.exports = teSibi;
