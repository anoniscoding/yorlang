/**
 * @param args receives two strings parent string and the substring
 * @returns boolean
 */
function waNinu (args) {
    if (args.length === 2) {
        const [ fS, sS, ] = args;
        return fS.includes(sS);
    }
    throw new Error("Yorlang system error: arguments should be two strings");
}
module.exports = waNinu;
