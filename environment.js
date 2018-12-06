const helperIseDeclarations = require("./helperise/registeredHelperIse.js");

class Environment {

    constructor() {
        this.vars = {};
        this.iseDeclarations = {};
    }

    setJeki(scope, name, value) {
        if (this.vars[scope] == undefined) {
            this.vars[scope] = {};
        }

        this.vars[scope][name] = value;
    }

    getJeki(scope, name) {
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

    isExistHelperIse(iseName) {
        return helperIseDeclarations[iseName] != undefined;
    }

    runHelperIse(iseName, iseArgs) {
        if (this.isExistHelperIse(iseName)) {
            return helperIseDeclarations[iseName](iseArgs);
        }
    }

    sope(value) {
        console.log(value);
    }
}

module.exports = Environment;