const constants = require("../constants.js");
const iPlus = require("./iplus.js");

const interpreters = {};
interpreters[Symbol.for(constants.SYM.PLUS)] = iPlus;