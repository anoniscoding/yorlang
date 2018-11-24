const IBase = require("./ibase.js");
const fs = require("fs");
const Parser = require("../parsers/parser.js");
const Lexer = require("../lexer.js");
const InputStream = require("../inputstream.js");

class INodeGbeWole extends IBase {

    interpreteNode(node) {
        const filePath = this.evaluateNode(node.path);
        const importedFile = fs.readFileSync(process.cwd() + filePath, 'utf8'); 
        INodeGbeWole.runImportedFile(this, importedFile);
    }

    static runImportedFile(context, importedFile) {
        const parser = new Parser(new Lexer(new InputStream(importedFile)));  
        context.interpreteProgram(parser);
    }
}

module.exports = new INodeGbeWole();