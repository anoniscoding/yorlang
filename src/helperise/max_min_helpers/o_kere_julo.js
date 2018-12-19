/**
 * Get the minimum oflist of numbers
 * input can either be an array or a number of arguments seperated by a ','
 * note that if the first argument is an array, all other arguments are neglected
 * @returns {[number]} minimumNumber
 */
function oKereJulo () {
    var obj = arguments[0];
    var array = [];
    if (isArray(obj)) {
        array = obj;
    } else {
        for ( var i=0; i < arguments.length; i++ ) {
            array.push(arguments[i]);
        }
    }
    return Math.min(...array);
}
function isArray (obj) {
    return !!obj && obj.constructor === Array;
}

module.exports = o_kere_julo;
