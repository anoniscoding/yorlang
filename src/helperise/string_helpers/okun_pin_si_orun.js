/**
 * receives a string and returns an array using the optional limiter
 * @returns array
 */
function pinoro (args) {
    if (Array.isArray(args)) {
        const [ string, limiter, ] = args;
        if ((typeof string === "string")) {
            return string.split(limiter || "");
        }
        throw new Error("Yorlang system error: arguments should be 2 strings");
    }
    throw new Error("Yorlang system error");
}

module.exports = pinoro;
