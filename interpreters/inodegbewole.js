const IBase = require("./ibase.js");
const fs = require("fs");
const Parser = require("../parsers/parser.js");
const Lexer = require("../lexer.js");
const InputStream = require("../inputstream.js");

class INodeGbeWole extends IBase {

    interpreteNode(node) {
        const fileName = this.evaluateNode(node.path);
        const importedFileString = fs.readFileSync(process.cwd() + fileName, 'utf8'); 
        INodeGbeWole.runImportedFile(this, importedFileString, fileName);
    }

    static runImportedFile(context, importedFile, fileName) {
        const parser = new Parser(new Lexer(new InputStream(importedFile)), fileName);
        context.interpreteImportedProgram(parser);
    }
}

module.exports = new INodeGbeWole();