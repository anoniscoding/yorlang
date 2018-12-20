const message = {
    english: {
        baseNodeType: (arg) => `${arg} must be of type BaseNode`,
        genericErrorMsg: (arg) => `Cannot process unexpected token : ${arg}`,
        funIncrementAndDecrementMsg: () => "Invalid yorlang decrement or increment operation",
        invalidFileMsg: () => "Invalid yorlang file. Expected file with .yl extension",
        invalidAssignment: () => "Cannot assign value to yorlang ise call",
        invalidArrayIndexTypeMsg: (arg) => `Typeof index given for array ${arg} must be a number`,
        arrayIndexDoesNotExistMsg: (arg) => `Index given for array ${arg} does not exist`,
        varDoesNotExist: (type, name) => `${type} ${name} is undefined`,
        iseAlreadyExist: (name, scope) => `Ise with name ${name} already exists within the ${scope} scope`,
        expectStringMsg: (arg) => `${arg} expects a string`,
        expectBooleanMsg: () => "Expecting yorlang keyword value e.g boolean(iró|òótó)",
        unexpectedDeclaration: (arg) => `Yorlang ${arg} keyword not expected`,
        yorlangArithmeticException: () => "YorlangArithmeticException - cannot divide by zero",
        undefinedValueMsg: (arg) => `Cannot set value undefined to variable ${arg}`,
        cannotNegateMsg: (arg) => `Cannot apply negation operator to the given expression: ${arg}`,

    },

    yoruba: {
        baseNodeType: (arg) => `${arg} gbọdọ jẹ ti iru BaseNode`,
        genericErrorMsg: (arg) => `Yorlang ò lè ṣiṣẹ́ pẹlú ààmì ìfura tó yọjú láìròtẹ́lẹ : ${arg}`,
        funIncrementAndDecrementMsg: () => "Ilana ti ko dara ti yorlang nidi ise afikun tabi iyokuro ninu 'fun'",
        invalidFileMsg: () => "Yorlang ko ri faili ti oruko re pari pelu .yl",
        invalidAssignment: () => "Yorlang ko le fun ipe ise ni iye",
        invalidArrayIndexTypeMsg: (arg) => `Atọka to je ti array ${arg} gbodo je nomba`,
        arrayIndexDoesNotExistMsg: (arg) => `Atọka to je ti array ${arg} ko si ninu ibi itoju nkan pamo yorlang`,
        varDoesNotExist: (type, name) => `${type} ${name} ko si ninu ibi itoju nkan pamo yorlang`,
        iseAlreadyExist: (name, scope) => `Ise to ni oruko ${name} ti wa ninu odi ${scope} tẹ́lẹ`,
        expectStringMsg: (arg) => `${arg} ti yorlang n reti string`,
        expectBooleanMsg: (arg) => "Yorlang n reti ooto tabi iro",
        unexpectedDeclaration: (arg) => `Yorlang ko reti '${arg}' ninu odi to ti yọjú`,
        yorlangArithmeticException: () => "YorlangArithmeticException - yorlang ko le se isiro pipin nipase òdo",
        undefinedValueMsg: (arg) => `Yorlang ko le fi ofifo sinu ${arg}`,
        cannotNegateMsg: (arg) => `Yorlang ò le lo aami iyokuru pelu ${arg} `,
    },
};

module.exports = message[global.defaultLang];
