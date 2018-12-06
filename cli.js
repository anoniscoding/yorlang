#!/usr/bin/env node

//since the Yorlang interpreter works through this file, we can create a global variable for the app directory and the path module here
global.path = require("path");
global.rootDir = path.dirname(__filename);

const packageJson = require("./package.json");
const _inputStream = require("./inputStream.js");
const _lexer = require("./lexer.js");
const _parser = require("./parsers/parser.js");
const _environment = require("./environment.js");
const _mainInterpreter = require("./interpreters/maininterpreter.js");
const constants = require("./constants.js");
const commander = require('commander');

commander.on('--help', function(){
    console.log('\nExamples:');
    console.log('  $ yorl test.yl');
    console.log('  $ yorl -h');
    console.log('  $ yorl -v');
  });

commander.version(packageJson.version, '-v, --version');
commander.arguments('<file>')
        .action((file) => {
            if (path.extname(file) === constants.YL_EXT) {
                const parser = new _parser(new _lexer(new _inputStream(file)));
                new _mainInterpreter(new _environment(), parser).interpreteProgram();
            } else {
                throw "Invalid Yorlang file. Expected a .yl file";
            }
        });

commander.parse(process.argv);