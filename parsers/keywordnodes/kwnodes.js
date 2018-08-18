const constants = require("../../constants.js");
const kwNodeTi =  require("./kwnodeti.js");
const kwNodeSope = require("./kwnodesope.js");
const kwNodeSe = require("./kwnodese");
const kwNodeNigbati = require("./kwnodenigbati.js");
const kwNodeFun = require("./kwnodefun.js");
const kwNodePada = require("./kwnodepada.js");
const kwNodeKuro = require("./kwnodekuro.js");
const kwNodeIse = require("./kwnodeise.js");
const kwNodeYi = require("./kwnodeyi.js");

const KwNodes = {};
KwNodes[constants.KW.TI] = kwNodeTi;
KwNodes[constants.KW.SOPE] = kwNodeSope;
KwNodes[constants.KW.SE] = kwNodeSe;
KwNodes[constants.KW.NIGBATI] = kwNodeNigbati;
KwNodes[constants.KW.FUN] = kwNodeFun;
KwNodes[constants.KW.PADA] = kwNodePada;
KwNodes[constants.KW.KURO] = kwNodeKuro;
KwNodes[constants.KW.ISE] = kwNodeIse;
KwNodes[constants.KW.YI] = kwNodeYi;

module.exports = KwNodes;