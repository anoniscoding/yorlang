const Language = require("./config/language.js");

const MESSAGE = {
    "english": {
        "BaseNodeType": function (arg) {
            return `${arg} must be of type BaseNode`;
        },
    },
    "yoruba": {
        "BaseNodeType": function (arg) {
            return `${arg} gbodo je iru BaseNode`;
        },
    },
};

module.exports = MESSAGE[Language.defaultLang];
