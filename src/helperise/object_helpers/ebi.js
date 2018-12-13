function ebi(args) {
    args = args || [];
    let key, dict = {}
    for (let obj of args) {
        if (typeof (obj) != 'object') {
            if (!key) key = obj;
            else {
                dict[key] = obj;
                key = undefined;
            }
        }
        else {
            if (!key) Object.assign(dict, obj);
            else {
                dict[key] = obj;
                key = undefined;
            }
        }
    }
    return dict;
}

module.exports = ebi;
