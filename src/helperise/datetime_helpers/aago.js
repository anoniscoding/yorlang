/**
 * Get date
 *
 * @returns {[ number, number, number, number, number, number, number ]} [ year, month, day, hours, minutes, seconds, milliseconds ]
 */
function aago (args) {
    const date = new Date();
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

module.exports = aago;
