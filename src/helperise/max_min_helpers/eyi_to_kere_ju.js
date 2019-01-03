/**
 * Get the minimum oflist of numbers
 * input can either be an array or a number of arguments seperated by a ','
 * note that if the first argument is an array, all other arguments are neglected
 * @returns {[number]} minimumNumber
 */
function eyiToKereJu (args) {
    if (Array.isArray(args)) {
        if (Array.isArray(args[0])) args = args[0];
        const min = Math.min(...args);
        if (Number.isNaN(min)) throw new Error("Invalid number params passed to eyiToKereJu");
        return min;
    }
    throw new Error("Yorlang System Error: args should be an array");
}

module.exports = eyiToKereJu;
