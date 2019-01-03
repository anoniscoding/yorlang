/**
 * Get the maximum of list of numbers,
 * input can either be an array or a number of arguments seperated by a ','
 * note that if the first argument is an array, all other arguments are neglected
 * @returns {[number]} maximumNumber
 */
function eyiToTobiJu (args) {
    if (Array.isArray(args)) {
        if (Array.isArray(args[0])) args = args[0];
        const max = Math.max(...args);
        if (Number.isNaN(max)) throw new Error("Invalid number params passed to eyiToTobiJu");
        return max;
    }
    throw new Error("Yorlang System Error: args should be an array");
}

module.exports = eyiToTobiJu;
