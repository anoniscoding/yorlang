#!/usr/bin/env node

//we are telling *nix systems that the interpreter of our JavaScript file should be /usr/bin/env node which looks up for the locally-installed node executable.

const packageJson = require("./package.json");
const fs = require("fs");
const path = require("path");
const InputStream = require("./inputstream.js");
const Lexer = require("./lexer.js");
const Parser = require("./parsers/parser.js");
const Environment = require("./environment.js");
const MainInterpreter = require("./interpreters/maininterpreter.js");
const constants = require("./constants.js");

//process.argv will usually have length two, the zeroth item being the "node" interpreter 
//and the first being the script that node is currently running, items after that were passed on the command line

const arg = process.argv[2];

if (arg === "-v") {
    console.log(packageJson.version);
} else if (path.extname(arg) === constants.YL_EXT) {
    fs.readFile(process.cwd() +"/"+ arg, 'utf8', (err, programFile) => {
        if (err) throw err; 

        const parser = new Parser(new Lexer(new InputStream(programFile)), arg);
        const interpreter = new MainInterpreter(new Environment());
        interpreter.interpreteProgram(parser);
    });
} else {
    throw "Invalid Yorlang command line argument";
}