const path = require('path');

const BaseNode = require(path.join(rootDir, "parsers/baseNode.js"));

//a mock class that does not override getNode
class KwNodeMock extends BaseNode {  }

module.exports = new KwNodeMock();