class Environment {

    constructor() {
        this.vars = {};
        this.iseDeclarations = {};
    }

    setTi(scope, name, value) {
        if (this.vars[scope] == undefined) {
            this.vars[scope] = {};
        }

        this.vars[scope][name] = value;
    }

    getTi(scope, name) {
        if (this.vars[scope] != undefined)
            return this.vars[scope][name];
    }

    setIse(scope, iseName, iseNode) {
        if (this.iseDeclarations[scope] == undefined) {
            this.iseDeclarations[scope] = {};
        }

        this.iseDeclarations[scope][iseName] = iseNode;
    }

    getIse(scope, iseName) {
        if (this.iseDeclarations[scope] != undefined) {
            return this.iseDeclarations[scope][iseName];
        }
    }

    sope(value) {
        console.log(value);
    }
}

module.exports = Environment;