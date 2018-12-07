const readlineSync = require('readline-sync');

//Takes command line input
function teSibi(args) {
    if (args instanceof Array) {
        const [param] = args;
        if (typeof param === "string") return readlineSync.question(param);

        throw new Error (`Invalid param given to helper ise teSibi.`);
    } 
    
    throw new Error('Yorlang system error');
}

module.exports = teSibi;