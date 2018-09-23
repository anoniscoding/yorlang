const constants = require("../constants.js");

const interpreters = {};
interpreters[constants.SYM.PLUS] = require("./iplus.js");
interpreters[constants.SYM.MINUS] = require("./iminus.js");
interpreters[constants.SYM.DIVIDE] = require("./idivide.js");
interpreters[constants.SYM.MULTIPLY] = require("./imultiply.js");
interpreters[constants.SYM.REMAINDER] = require("./iremainder.js");
interpreters[constants.SYM.ASSIGN] = require("./inodeti.js");
interpreters[constants.GET_TI] = require("./inodegetti.js");
interpreters[constants.KW.SOPE] = require("./inodesope.js");
interpreters[constants.ARRAY] = require("./inodearray.js");

module.exports = interpreters;