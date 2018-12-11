const constants = require("../../constants.js");
const leafNl = require("./leafnl.js");

const nodeLiterals = {};
nodeLiterals[constants.EXP_PUNC] = {};
nodeLiterals[constants.VARIABLE] = require("./variablenl.js");
nodeLiterals[constants.NUMBER] = leafNl;
nodeLiterals[constants.STRING] = leafNl;
nodeLiterals[constants.KEYWORD] = require("./keywordnl");
nodeLiterals[constants.CALL_ISE] = require("./callIseNl.js");
nodeLiterals[constants.EXP_PUNC][constants.SYM.L_SQ_BRACKET] = require("./arraynl.js");
nodeLiterals[constants.EXP_PUNC][constants.SYM.L_BRACKET] = require("./bracketexpressionnl.js");
nodeLiterals[constants.EXP_PUNC][constants.SYM.EXCLAMATION_POINT] = require("./notoperatornl.js");

module.exports = nodeLiterals;
