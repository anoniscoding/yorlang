/**
 * Get or Set object property
 * @param {[ object, string, string ]} args object, key, value
 */
function omo(args) {
    if (Array.isArray(args)) {
        const [ dict, key, value ] = args;
        if (typeof(dict) == 'object') {
            if (typeof (key) == 'string') {
                if (value) dict[key] = value;
                return dict[key];
            }
            else {
                throw new Error('Yorlang system error: second argument must be a string');
            }
        }
        else {
            throw new Error('Yorlang system error: first argument must be an ebi (object)');
        }
    }
    throw new Error('Yorlang system error: no arguments specified');
}

module.exports = omo;
