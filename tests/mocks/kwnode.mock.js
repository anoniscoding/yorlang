const BaseKwNode = require("../../parsers/keywordnodes/basekwnode.js");

//a mock class that does not override getNode
class KwNodeMock extends BaseKwNode {  }

module.exports = new KwNodeMock();