const constants = require("../constants.js");
const iPlus = require("./iplus.js");
const iMinus = require("./iminus.js");
const iDivide = require("./idivide.js");
const iMultiply = require("./imultiply.js");
const iRemainder = require("./iremainder.js");
const iNodeTi = require("./inodeti.js");
const iNodeGetTi = require("./inodegetti.js");

const interpreters = {};
interpreters[Symbol.for(constants.SYM.PLUS)] = iPlus;
interpreters[Symbol.for(constants.SYM.MINUS)] = iMinus;
interpreters[Symbol.for(constants.SYM.DIVIDE)] = iDivide;
interpreters[Symbol.for(constants.SYM.MULTIPLY)] = iMultiply;
interpreters[Symbol.for(constants.SYM.REMAINDER)] = iRemainder;
interpreters[Symbol.for(constants.SYM.ASSIGN)] = iNodeTi;
interpreters[Symbol.for(constants.GET_TI)] = iNodeGetTi;

module.exports = interpreters;