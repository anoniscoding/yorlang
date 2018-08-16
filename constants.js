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
    SE: "sé",
    YI: "yí",
    EJO: "ejó",
    PADASI: "padàsí"
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
    COMMA: ",",
    COMMENT: "#",
    L_BRACKET: "(",
    R_BRACKET: ")",
    L_SQ_BRACKET: "[",
    R_SQ_BRACKET: "]",
    STATEMENT_TERMINATOR : ";",
    NEW_LINE: "\n",
    TAB_SPACE: "\t",
    EMPTY_SPACE: " ",
    EXCLAMATION_POINT: "!",
    PIPE: "|",
    COLON: ":"
};

const LIST = {
    PUNCTUATIONS: [ 
        SYMBOLS.L_BRACKET, SYMBOLS.R_BRACKET, SYMBOLS.L_PAREN,
        SYMBOLS.R_PAREN, SYMBOLS.STATEMENT_TERMINATOR, SYMBOLS.COMMA,
        SYMBOLS.L_SQ_BRACKET, SYMBOLS.R_SQ_BRACKET, SYMBOLS.COLON
    ],
    OPERATORS: [
        SYMBOLS.PLUS, SYMBOLS.MINUS, SYMBOLS.MULTIPLY,
        SYMBOLS.DIVIDE, SYMBOLS.REMAINDER, SYMBOLS.L_THAN,
        SYMBOLS.G_THAN, SYMBOLS.EQ, SYMBOLS.EXCLAMATION_POINT, 
        SYMBOLS.PIPE, SYMBOLS.BINARY_AND, SYMBOLS.ASSIGN
    ],
    WHITESPACES: [ 
        SYMBOLS.EMPTY_SPACE, SYMBOLS.TAB_SPACE, SYMBOLS.NEW_LINE 
    ],
    KEYWORDS: [
        KEYWORDS.TI, KEYWORDS.NIGBATI, KEYWORDS.SE, KEYWORDS.SOPE, 
        KEYWORDS.TABI, KEYWORDS.OOTO, KEYWORDS.IRO, KEYWORDS.ISE, 
        KEYWORDS.FUN, KEYWORDS.PADA, KEYWORDS.KURO, KEYWORDS.YI,
        KEYWORDS.EJO, KEYWORDS.PADASI
    ]
};

const REGEX = {
    DIGIT: /[0-9]/i,
    IDENTIFIER: /[a-z]|í|é|ò|ó|à|ú/i,
};

const PARSERSHELPERS = {
    PARSE_ISE_NODE: "parseIseNode",
    PARSE_FUN_NODE: "parseFunNode",
    IS_VALID_FUN_INIT_STATEMENT: "isValidFunInitStatement",
    IS_INVALID_FUN_INCREMENT_STATEMENT: "isInValidFunIncrementStatement"
};

const constants = {
    KW: KEYWORDS,
    SYM: SYMBOLS,
    LIST: LIST,
    REGEX: REGEX,
    PH: PARSERSHELPERS,
    KEYWORD: "keyword",
    VARIABLE: "variable",
    STRING: "string",
    ARRAY: "array",
    NUMBER: "number",
    PROGRAM: "program",
    PUNCTUATION: "punctuation",
    OPERATOR: "operator",
    GET_TI: "getTi",
    CALL_ISE: "callIse",
    L_SQ_BRACKET_SYM_NAME: "L_SQ_BRACKET",
    L_BRACKET_SYM_NAME: "L_BRACKET"
};

module.exports = constants;
