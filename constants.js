const KEYWORDS = {
    TI: "tí",
    NIGBATI: "nígbàtí",
    SOPE: "sopé",
    TABI: "tàbí",
    OOTO: "òótó",
    IRO: "iró",
    ISE: "isé",
    FUN: "fún",
    PADA: "padà",
    KURO: "kúrò",
    SE: "sé"
};

const SYMBOLS = {
    STR_QUOTE: '"',
    PERIOD: ".",
    OR: "||",
    AND: "&&",
    L_THAN: "<",
    G_THAN: ">",
    G_THAN_OR_EQ: ">=",
    L_THAN_OR_EQ: "<=",
    NOT_EQ: "!=",
    EQ: "==",
    ASSIGN: "=",
    PLUS: "+",
    MINUS: "-",
    MULTIPLY: "*",
    DIVIDE: "/",
    REMAINDER: "%",
    L_PAREN: "{",
    R_PAREN: "}",
    COMMA: ",",
    COMMENT: "#",
    L_BRACKET: "(",
    R_BRACKET: ")"
};

const LIST = {
    PUNCTUATIONS: ["(",")","{","}",";",","],
    OPERATORS: ["+","-","*","/","%","<",">","=","!","|","&"],
    WHITESPACES: [" ","\t","\n"],
    KEYWORDS: [
        KEYWORDS.TI, KEYWORDS.NIGBATI, KEYWORDS.SE, KEYWORDS.SOPE, 
        KEYWORDS.TABI, KEYWORDS.OOTO, KEYWORDS.IRO, KEYWORDS.ISE, 
        KEYWORDS.FUN, KEYWORDS.PADA, KEYWORDS.KURO
    ]
}

const REGEX = {
    DIGIT: /[0-9]/i,
    IDENTIFIER: /[a-z]|í|é|ò|ó|à|ú/i,
}

const constants = {
    STATEMENT_TERMINATOR : ";",
    NEW_LINE: "\n",
    KW: KEYWORDS,
    SYM: SYMBOLS,
    LIST: LIST,
    REGEX: REGEX,
    KEYWORD: "keyword",
    VARIABLE: "variable",
    STRING: "string",
    NUMBER: "number",
    PROGRAM: "program",
    PUNCTUATION: "punctuation",
    OPERATOR: "operator",
    GET_TI: "getTi",
    CALL_ISE: "callIse",
};

module.exports = constants;
