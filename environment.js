class Environment {

    constructor() {
        this.vars = {};
        this.iseDeclarations = {};
    }

    setTi(scope, name, value) {
        this.vars[scope][name] = value;
    }

    getTi(scope, name) {
        return this.vars[scope][name];
    }

    setIse(scope, childIse, node) {
        this.iseDeclarations[scope][childIse] = node;
    }

    getIse(scope, childIse) {
        return this.iseDeclarations[scope][childIse];
    }

    sope(value) {
        console.log(value);
    }

    printAllVars() {
        console.log(this.vars);
    }
}

module.exports = Environment;