const constants = require("../constants.js");
const iPlus = require("./iplus.js");
const iMinus = require("./iminus.js");
const iDivide = require("./idivide.js");
const iMultiply = require("./imultiply.js");
const iRemainder = require("./iremainder.js");
const iNodeTi = require("./inodeti.js");
const iNodeGetTi = require("./inodegetti.js");

const interpreters = {};
interpreters[constants.SYM.PLUS] = iPlus;
interpreters[constants.SYM.MINUS] = iMinus;
interpreters[constants.SYM.DIVIDE] = iDivide;
interpreters[constants.SYM.MULTIPLY] = iMultiply;
interpreters[constants.SYM.REMAINDER] = iRemainder;
interpreters[constants.SYM.ASSIGN] = iNodeTi;
interpreters[constants.GET_TI] = iNodeGetTi;

module.exports = interpreters;