const message = {
    english: {
        baseNodeType: (arg) => `${arg} must be of type BaseNode`,
        genericErrorMsg: (arg) => `Cannot process unexpected token : ${arg}`,
    },

    yoruba: {
        baseNodeType: (arg) => `${arg} gbọdọ jẹ ti iru BaseNode`,
        genericErrorMsg: (arg) => `kò lè ṣiṣẹ́ pẹlú ààmì ìfura tó yọjú láìròtẹ́lẹ : ${arg}`,
    },
};

module.exports = message[global.defaultLang];
