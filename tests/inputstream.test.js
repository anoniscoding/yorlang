
const InputStream = require("../inputstream.js");
const Lexer = require("../lexer.js");

const code = `
#Sample program to be interpreted

tí akoko = 7.51;
tí ikeji = 2;
tí aropo = akoko / 3 + ikeji * 2;
sopé aropo;

tí niOruko = òótó;

sé (akoko > aropo && òótó) {
    sopé "omowe";
} tàbí {
    sopé "olodo"; 
}

sé (niOruko) {
    sopé "o ni oruko";
}

sé (niOruko) {}

tí oruko = "";

isé koOruko(orukoMi) {
    tí oruko = orukoMi;
    
    fún (tí i =0; i < 10; tí i = i + 1;) {
        sopé i;
    }

    isé teAkori() {
        sopé "adupe";
    }

    nígbàtí ((ikeji < aropo) && (ikeji > 0)) {
        sopé "a jura wa lo tijakadi ko";
        tí ikeji = ikeji + 1;
    }

    teAkori();
}

isé teOruko() {
    sopé oruko;
}

fún (tí i =45; ((i < 200) && (i > 0)); tí i = i + i;) {
    sopé i;
}

isé seIsiro(a, b) {
    tí a = a * 2;
    tí c = a + b;
    padà c;
}

koOruko("anu");
teOruko();
tí d = seIsiro(1,2);

tí c = (15 /3) + (3 * 2);

nígbàtí (ikeji < aropo) {
    sopé "ikeji kere si aropo";
    tí ikeji = ikeji + 1;
    
    sé (ikeji > c) {
        kúrò;
    }
}
`;


const ast = (new Lexer(new InputStream(code)))

console.log(ast.astList[0])
