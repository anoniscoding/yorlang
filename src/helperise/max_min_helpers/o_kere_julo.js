/**
 * Get the minimum oflist of numbers
 * input can either be an array or a number of arguments seperated by a ','
 * note that if the first argument is an array, all other arguments are neglected
 * @returns {[number]} minimumNumber
 */
function eyiToKereJu () {
    const obj = arguments[0];
    let array = [];
    if (Array.isArray(obj)) {
        array = obj;
    } else {
        for (var i = 0; i < arguments.length; i++) {
            if (isNaN(arguments[i])) {
            } else {
                array.push(arguments[i]);
            }
        }
    }
    const minValue = Math.min(...array);
    if (isNaN(minValue)) {
        throw new Error("Invalid param given to helper ise eyiToKereJu.");
    } else {
        return minValue;
    }
}

module.exports = eyiToKereJu;
