const constants = require("../constants.js");
const kwNodeFun = require("./keywordnodes/kwnodefun.js");
const kwNodeYi = require("./keywordnodes/kwnodeyi.js");

const helper = {}
helper[constants.PH.PARSE_FUN_NODE] = kwNodeFun.parseFunNode;
helper[constants.PH.IS_VALID_FUN_INIT_STATEMENT] = kwNodeFun.isValidFunInitStatement;
helper[constants.PH.IS_INVALID_FUN_INCREMENT_STATEMENT] = kwNodeFun.isInValidFunIncrementStatement;
helper[constants.PH.GET_YI_NODE_WITH_PADASI] = kwNodeYi.getYiNodeWithPadasi;
module.exports = helper;