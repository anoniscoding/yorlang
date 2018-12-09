#!/usr/bin/env node

const packageJson = require("./package.json");
const path = require("path");
const InputStream = require("./inputstream.js");
const Lexer = require("./lexer.js");
const Parser = require("./parsers/parser.js");
const Environment = require("./environment.js");
const MainInterpreter = require("./interpreters/maininterpreter.js");
const constants = require("./constants.js");
const commander = require('commander');

commander.on('--help', function(){
    console.log('')
    console.log('Examples:');
    console.log('  $ yorl test.yl');
    console.log('  $ yorl -h');
    console.log('  $ yorl -v');
  });

commander.version(packageJson.version, '-v, --version');
commander.arguments('<file>')
        .action((file) => {
            if (path.extname(file) === constants.YL_EXT) { 
                const parser = new Parser(new Lexer(new InputStream(file)));
                new MainInterpreter(new Environment(), parser).interpreteProgram();
            } else {
                throw "Invalid Yorlang file. Expected a .yl file";
            }
        });

commander.parse(process.argv);