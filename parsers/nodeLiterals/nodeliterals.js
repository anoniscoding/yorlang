const constants = require("../../constants.js");
const leafNl = require("./leafnl.js");
const keywordNl = require("./keywordnl");
const variableNl = require("./variablenl.js");
const arrayNl = require("./arraynl.js");
const callIseNl = require("./callIseNl.js");
const bracketExpressionNl = require("./bracketexpressionnl.js");

const nodeLiterals = {};
nodeLiterals[constants.EXP_PUNC] = {};
nodeLiterals[constants.VARIABLE] = variableNl;
nodeLiterals[constants.NUMBER] = leafNl;
nodeLiterals[constants.STRING] = leafNl;
nodeLiterals[constants.KEYWORD] = keywordNl;
nodeLiterals[constants.CALL_ISE] = callIseNl;
nodeLiterals[constants.EXP_PUNC][Symbol.for(constants.SYM.L_SQ_BRACKET)] = arrayNl;
nodeLiterals[constants.EXP_PUNC][Symbol.for(constants.SYM.L_BRACKET)] = bracketExpressionNl;

module.exports = nodeLiterals;