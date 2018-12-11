const constants = require("../../constants.js");

const KwNodes = {};
KwNodes[constants.KW.JEKI] = require("./kwnodejeki.js");
KwNodes[constants.KW.SOPE] = require("./kwnodesope.js");
KwNodes[constants.KW.SE] = require("./kwnodese");
KwNodes[constants.KW.NIGBATI] = require("./kwnodenigbati.js");
KwNodes[constants.KW.FUN] = require("./kwnodefun.js");
KwNodes[constants.KW.PADA] = require("./kwnodepada.js");
KwNodes[constants.KW.KURO] = require("./kwnodekuro.js");
KwNodes[constants.KW.ISE] = require("./kwnodeise.js");
KwNodes[constants.KW.YI] = require("./kwnodeyi.js");
KwNodes[constants.KW.GBE_WOLE] = require("./kwnodegbewole.js");
KwNodes[constants.KW.WOKE] = require("./kwnodewoke.js");

module.exports = KwNodes;
