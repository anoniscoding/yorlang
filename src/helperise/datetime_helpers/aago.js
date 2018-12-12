/**
 * 
 * @param {[ number, number, number, number, number, number, number ]} args year, month, day, hours, minutes, seconds, and milliseconds
 * 
 * @returns {[ number, number, number, number, number, number, number ]} [ year, month, day, hours, minutes, seconds, milliseconds ]
 */
function aago(args) {
    if (args instanceof Array) {
        const d = new Date(...args);
        return [ 
            d.getFullYear(), 
            d.getMonth() + 1, 
            d.getDate(), 
            d.getHours(), 
            d.getMinutes(), 
            d.getSeconds(), 
            d.getMilliseconds()
        ];
    } 
    
    throw new Error('Yorlang system error');
}

module.exports = aago;
