const constants = require("../constants.js");
const kwNodeIse = require("./keywordnodes/kwnodeise.js");
const kwNodeFun = require("./keywordnodes/kwnodefun.js");

const helper = {}
helper[constants.PH.PARSE_ISE_NODE] = kwNodeIse.parseIseNode;
helper[constants.PH.PARSE_FUN_NODE] = kwNodeFun.parseFunNode;
helper[constants.PH.IS_VALID_FUN_INIT_STATEMENT] = kwNodeFun.isValidFunInitStatement;
helper[constants.PH.IS_INVALID_FUN_INCREMENT_STATEMENT] = kwNodeFun.isInValidFunIncrementStatement;

module.exports = helper;