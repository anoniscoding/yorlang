/**
 * Get the maximum of list of numbers,
 * input can either be an array or a number of arguments seperated by a ','
 * 
 * note that if the first argument is an array, all other arguments are neglected
 * @returns {[number]} maximumNumber
 */
function o_tobi_julo(){
    var obj = arguments[0]
    var array = []
    if(isArray(obj)){
        array = obj
    }else{
        for (var i=0; i < arguments.length; i++) {
            array.push(arguments[i])

        }
    }
    return Math.max(...array);
}
function isArray(obj){
    return !!obj && obj.constructor === Array;
}

module.exports = o_tobi_julo;