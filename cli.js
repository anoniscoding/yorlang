#!/usr/bin/env node

//since the interpreter works through this file, we can create a global variable for the app directory and the path module here
global.path = require("path");
global.rootDir = path.dirname(__filename);

//we are telling *nix systems that the interpreter of our JavaScript file should be /usr/bin/env node which looks up for the locally-installed node executable.
const packageJson = require("./package.json");
const _inputStream = require("./inputStream.js");
const _lexer = require("./lexer.js");
const _parser = require("./parsers/parser.js");
const _environment = require("./environment.js");
const _mainInterpreter = require("./interpreters/maininterpreter.js");
const constants = require("./constants.js");

//process.argv will usually have length two, the zeroth item being the "node" interpreter 
//and the first being the script that node is currently running, items after that were passed on the command line

const filename = process.argv[2];

if (filename === "-v") {
    console.log(packageJson.version);
} else if (path.extname(filename) === constants.YL_EXT) {
    const parser = new _parser(new _lexer(new _inputStream(filename)));
    new _mainInterpreter(new _environment(), parser).interpreteProgram();
} else {
    throw "Invalid Yorlang command line argument";
}