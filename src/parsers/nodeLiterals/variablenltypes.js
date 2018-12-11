const constants = require("../../constants.js");

const variableNlTypes = {};
variableNlTypes[constants.SYM.L_BRACKET] = require("./callIseNl.js"); // when current variable is a function call
variableNlTypes[constants.SYM.L_SQ_BRACKET] = require("./arraynl.js"); // when current variable is an array element

module.exports = variableNlTypes;
