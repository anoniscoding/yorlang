/**
 * Get date
 *
 * @returns {[ number, number, number, number, number, number, number ]} [ year, month, day, hours, minutes, seconds, milliseconds ]
 */
function aago (args) {
    if (Array.isArray(args)) {
        // make sure an array can be passed in as the first param
        if (Array.isArray(args[0])) args = args[0];
        if (args[1]) --args[1]; // make sure month is 1-based rather than 0-based
        const date = new Date(...args);
        return [
            date.getFullYear(),
            date.getMonth() + 1,
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
