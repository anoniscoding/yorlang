const constants = require("../constants.js");
const iPlus = require("./iplus");

const interpreters = {};
interpreters[Symbol.for(constants.SYM.PLUS)] = iPlus;