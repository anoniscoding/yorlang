const constants = require("../../constants.js");
const arrayNl = require("./arraynl.js");
const callIseNl = require("./callIseNl.js");

const variableTypes = {};
variableTypes[constants.SYM.L_BRACKET] = callIseNl;  //when current variable is a function call
variableTypes[constants.SYM.L_SQ_BRACKET] = arrayNl; //when current variable is an array element

module.exports = variableTypes;