/**
 * Get date
 * @param {[ number, number, number, number, number, number, number ]} args year, month, day, hours, minutes, seconds, and milliseconds
 *
 * @returns {[ number, number, number, number, number, number, number ]} [ year, month, day, hours, minutes, seconds, milliseconds ]
 */
function aago (args) {
    args = (args || []);
    if (Array.isArray(args)) {
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
