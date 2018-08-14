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
    BINARY_AND: "&",
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
    L_SQ_BRACKET: "[",
    R_SQ_BRACKET: "]",
    COMMA: ",",
    COMMENT: "#",
    L_BRACKET: "(",
    R_BRACKET: ")",
    STATEMENT_TERMINATOR : ";",
    NEW_LINE: "\n",
    TAB_SPACE: "\t",
    EMPTY_SPACE: " ",
    EXCLAMATION_POINT: "!",
    PIPE: "|",

};

const LIST = {
    PUNCTUATIONS: [ 
        SYMBOLS.L_BRACKET, SYMBOLS.R_BRACKET, SYMBOLS.L_PAREN,
        SYMBOLS.R_PAREN, SYMBOLS.STATEMENT_TERMINATOR, SYMBOLS.COMMA,
    ],
    OPERATORS: [
        SYMBOLS.PLUS, SYMBOLS.MINUS, SYMBOLS.MULTIPLY,
        SYMBOLS.DIVIDE, SYMBOLS.REMAINDER, SYMBOLS.L_THAN,
        SYMBOLS.G_THAN, SYMBOLS.EQ, SYMBOLS.EXCLAMATION_POINT, 
        SYMBOLS.PIPE, SYMBOLS.BINARY_AND
    ],
    WHITESPACES: [ 
        SYMBOLS.EMPTY_SPACE, SYMBOLS.TAB_SPACE, SYMBOLS.NEW_LINE 
    ],
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
