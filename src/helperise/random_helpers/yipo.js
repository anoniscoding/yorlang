/**
 * Returns a random number between two values (0 -> 1 by default)
 * - If only one argument is specified, that will become the maximum range, with 0 as the minimum.
 * - If two arguments are specified, the first will be the minimum, and the second will be the maximum.
 *
 * @returns {number}
 */
function yipo (args) {
    if (Array.isArray(args)) {
        let [ min, max, ] = args;
        min = Number(min) || 0;
        max = Number(max) || 0;

        if (min && !max) {
            max = min;
            min = 0;
        }

        if (!max) max = 1;

        return min + (Math.random() * (max - min));
    }
    throw new Error("Yorlang system error");
}

module.exports = yipo;
