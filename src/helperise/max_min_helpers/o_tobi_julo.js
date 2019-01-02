/**
 * Get the maximum of list of numbers,
 * input can either be an array or a number of arguments seperated by a ','
 * note that if the first argument is an array, all other arguments are neglected
 * @returns {[number]} maximumNumber
 */
function eyiToTobiJu () {
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
    const maxValue = Math.max(...array);
    if (isNaN(maxValue)) {
        throw new Error("Invalid param given to helper ise eyiToTobiJu.");
    } else {
        return maxValue;
    }
}

module.exports = eyiToTobiJu;
