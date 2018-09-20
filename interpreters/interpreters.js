const constants = require("../constants.js");
const iPlus = require("./iplus.js");
const iMinus = require("./iminus.js");
const iDivide = require("./idivide.js");
const iMultiply = require("./imultiply.js");

const interpreters = {};
interpreters[Symbol.for(constants.SYM.PLUS)] = iPlus;
interpreters[Symbol.for(constants.SYM.MINUS)] = iMinus;
interpreters[Symbol.for(constants.SYM.DIVIDE)] = iDivide;
interpreters[Symbol.for(constants.SYM.MULTIPLY)] = iMultiply;