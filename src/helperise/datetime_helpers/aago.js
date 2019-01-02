/**
 * Get date
 *
 * @returns {[ number, number, number, number, number, number, number ]} [ year, month, day, hours, minutes, seconds, milliseconds ]
 */
function aago (args) {
    if (Array.isArray(args)) {
        // make sure an array can be passed in as the first param
        if (Array.isArray(args[0])) args = args[0];
        if (args[1]) --args[1]; // convert month value to 0-based index for JavaScript
        const date = new Date(...args);
        return [
            date.getFullYear(),
            date.getMonth() + 1, // increment 0-based index for use by Yorlang
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds(),
        ];
    }

    throw new Error("Yorlang system error: arguments[0] should be Array");
}

module.exports = aago;
