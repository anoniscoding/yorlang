const readlineSync = require("readline-sync");

// Takes command line input
function teSibi (args) {
    if (Array.isArray(args)) {
        const [ question, ] = args;
        if (typeof question === "string") {
            const input = readlineSync.question(question);
            return parseFloat(input) || input;
        }

        throw new Error("Invalid param given to helper ise teSibi.");
    }

    throw new Error("Yorlang system error");
}

module.exports = teSibi;
