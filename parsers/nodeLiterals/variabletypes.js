const constants = require("../../constants.js");

const variableTypes = {};
variableTypes[constants.SYM.L_BRACKET] = require("./callIseNl.js");  //when current variable is a function call
variableTypes[constants.SYM.L_SQ_BRACKET] = require("./arraynl.js"); //when current variable is an array element

module.exports = variableTypes;