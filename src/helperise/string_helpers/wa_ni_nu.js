/**
 * @param args receives two strings parent string and the substring
 * @returns string
 */
function waNinu (args) {
    if (Array.isArray(args)) {
        const [ parentString, subString, ] = args;
        if ((typeof parentString === "string") && (typeof subString === "string")) {
            return parentString.includes(subString);
        }
        throw new Error("Yorlang system error: arguments should be two strings");
    }
    throw new Error("Yorlang system error");
}
module.exports = waNinu;
