// Convert String to lower case
function siLetaKekere (args) {
    if (Array.isArray(args)) {
        const [ param, ] = args;
        if (typeof param === "string") return param.toLowerCase();

        throw new Error("Invalid param given to helper ise síLẹ́tàkékeré.");
    }

    throw new Error("Yorlang system error");
}

module.exports = siLetaKekere;
