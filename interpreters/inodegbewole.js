const IBase = require("./ibase.js");
const fs = require("fs");
const Parser = require("../parsers/parser.js");
const Lexer = require("../lexer.js");
const InputStream = require("../inputstream.js");

class INodeGbeWole extends IBase {

    interpreteNode(node) {
        const fileName = this.evaluateNode(node.path);
        INodeGbeWole.runImportedFile(this, fileName);
    }

    static runImportedFile(context, fileName) {
        const parser = new Parser(new Lexer(new InputStream(fileName)));
        context.interpreteImportedProgram(parser);
    }
}

module.exports = new INodeGbeWole();