const constants = require("../../constants.js");
const numberNl = require("./numbernl.js");
const stringNl = require("./stringnl.js");
const keywordNl = require("./keywordnl");
const variableNl = require("./variablenl.js");

const nodeLiterals = {};
nodeLiterals[constants.VARIABLE] = variableNl;
nodeLiterals[constants.NUMBER] = numberNl;
nodeLiterals[constants.STRING] = stringNl;
nodeLiterals[constants.KEYWORD] = keywordNl;

module.exports = nodeLiterals;

