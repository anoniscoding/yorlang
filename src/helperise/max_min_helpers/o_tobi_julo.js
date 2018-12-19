/**
 * Get the maximum of list of numbers,
 * input can either be an array or a number of arguments seperated by a ','
 * note that if the first argument is an array, all other arguments are neglected
 * @returns {[number]} maximumNumber
 */
function oTobiJulo () {
    var obj = arguments[0];
    var array = [];
    if (isArray(obj)) {
        array = obj;
    } else {
        for (var i = 0; i < arguments.length; i++) {
            if (isNaN(arguments[i])) {
            } else {
                array.push(arguments[i]);
            }
        }
    }
    return Math.max(...array);
}
function isArray (obj) {
    return !!obj && obj.constructor === Array;
}

module.exports = oTobiJulo;
