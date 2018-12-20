#!/usr/bin/env node

const packageJson = require("./package.json");
const path = require("path");
const constants = require("./src/constants.js");
const commander = require("commander");

commander.on("--help", function () {
    console.log("");
    console.log("Examples:");
    console.log("  $ yorl test.yl");
    console.log("  $ yorl test.yl -l yoruba");
    console.log("  $ yorl -h");
    console.log("  $ yorl -v");
});

commander.version(packageJson.version, "-v, --version");

commander.arguments("[file]")
    .option("-l, --lang [lang]", "Select language to use")
    .action((file, options) => {
        if (path.extname(file) === constants.YL_EXT) {
            setGlobalVars(options);
            startYorlangProcess(file);
        } else {
            throw new Error("Invalid Yorlang file. Expected a .yl file");
        }
    });

commander.parse(process.argv);

function setGlobalVars (options) {
    const lang = [ "english", "yoruba", ];
    global.defaultLang = lang.includes(options.lang) ? options.lang : "english";
}

function startYorlangProcess (file) {
    const InputStream = require("./src/inputstream.js");
    const Lexer = require("./src/lexer.js");
    const Parser = require("./src/parsers/parser.js");
    const Environment = require("./src/environment.js");
    const MainInterpreter = require("./src/interpreters/maininterpreter.js");

    const parser = new Parser(new Lexer(new InputStream(file)));
    new MainInterpreter(new Environment(), parser).interpreteProgram();
}
