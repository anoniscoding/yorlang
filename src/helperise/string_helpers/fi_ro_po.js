/**
 * @param args receives three strings parent string , the string to be replaced, and the new string.
 * @returns string
 */
function fiRopo (args) {
    if (Array.isArray(args)) {
        const [ parentString, regex, newString, ] = args;
        if ((typeof parentString === "string") && (typeof regex === "string") && (typeof newString === "string")) {
            return parentString.replace(regex, newString);
        }
        throw new Error("Yorlang system error: arguments should be three strings");
    }
    throw new Error("Yorlang system error");
}
module.exports = fiRopo;
