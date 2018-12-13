
/**
 * @param args receives three strings parent string and the string to be replaced.
 * @returns string
 */
function fiRopo (args) {
    if (args.length === 3) {
        const [ string, regex, newString, ] = args;
        return string.replace(regex, newString);
    }
    throw new Error("Yorlang system error: arguments should be three strings");
}
module.exports = fiRopo;
