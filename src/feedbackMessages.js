const message = {
    english: {
        baseNodeType: (arg) => `${arg} must be of type BaseNode`,
        getGenericErrorMsg: (arg) => `Cannot process unexpected token : ${arg}`,
    },

    yoruba: {
        baseNodeType: (arg) => `${arg} gbọdọ jẹ ti iru BaseNode`,
        getGenericErrorMsg: (arg) => `Ko le ṣe itọju aami ifihan lairotẹlẹ : ${arg}`,
    },
};

module.exports = message[global.defaultLang];
