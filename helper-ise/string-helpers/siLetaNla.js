//Convert String to upper case
function siLetaNla(args) {
    if (args instanceof Array) {
        const [param] = args;
        if (typeof param === "string") return param.toUpperCase();

        throw new Error (`Invalid param given to helper ise síLẹ́tàŃlá.`);
    } 
    
    throw new Error('Yorlang system error');
}

module.exports = siLetaNla;