const BaseNode = require("../../parsers/basenode.js");

//a mock class that does not override getNode
class KwNodeMock extends BaseNode {  }

module.exports = new KwNodeMock();