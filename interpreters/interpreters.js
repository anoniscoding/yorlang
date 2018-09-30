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
interpreters[constants.SYM.EQ] = require("./inodeequals.js");
interpreters[constants.SYM.G_THAN] = require("./inodegthan.js");
interpreters[constants.SYM.OR] = require("./inodeor.js");
interpreters[constants.SYM.AND] = require("./inodeand.js");
interpreters[constants.SYM.L_THAN] = require("./inodelthan.js");
interpreters[constants.SYM.G_THAN_OR_EQ] = require("./inodegthanoreq.js");
interpreters[constants.SYM.L_THAN_OR_EQ] = require("./inodelthanoreq.js");
interpreters[constants.SYM.NOT_EQ] = require("./inodenoteq.js");
interpreters[constants.KW.SE] = require("./inodese.js");

module.exports = interpreters;