// Get array length
function ka (args) {
    if (args instanceof Array) {
        const [ param, ] = args;
        if (param instanceof Array) return param.length;

        throw new Error("Invalid param given to helper ise ka.");
    }

    throw new Error("Yorlang system error");
}

module.exports = ka;
