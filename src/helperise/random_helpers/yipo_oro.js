/**
 * Returns a random number between two values (0 -> 1 by default)
 * - If only one argument is specified, that will become the maximum range, with 0 as the minimum.
 * - If two arguments are specified, the first will be the minimum, and the second will be the maximum.
 *
 * @returns {number}
 */
function yipooro (args) {
    if (Array.isArray(args)) {
        let [ length, ] = args;

        var result = "";
        var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    throw new Error("Yorlang system error");
}

module.exports = yipooro;
