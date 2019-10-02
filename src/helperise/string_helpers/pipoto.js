/**
 * @param {string} str - receives a string and returns the length
 * @returns number
 */
function pipoto (args) {
    if (Array.isArray(args)) {
        const [ string, ] = args;
        if (typeof string === "string") {
            return string.length;
        }
        throw new Error("Yorlang system error: arguments should be 1 string");
    }
    throw new Error("Yorlang system error");
}

module.exports = pipoto;
