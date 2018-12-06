const path = require('path');
module.exports = {
    globals: {
        rootDir: path.dirname(__filename), //set app root directory for jest tests
    },
    setupFiles: [
        '<rootDir>/jest.setup.js',
    ],
};