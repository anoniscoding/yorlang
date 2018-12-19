const message = {
    english: {
        baseNodeType: function (arg) {
            return `${arg} must be of type BaseNode`;
        },
        getGenericErrorMsg: function (arg) {
            return `Cannot process unexpected token : ${arg}`;
        },
    },
    yoruba: {
        baseNodeType: function (arg) {
            return `${arg} gbọdọ jẹ ti iru BaseNode`;
        },
        getGenericErrorMsg: function (arg) {
            return `Ko le ṣe itọju aami ifihan lairotẹlẹ : ${arg}`;
        },
    },
};

module.exports = message[global.defaultLang];
