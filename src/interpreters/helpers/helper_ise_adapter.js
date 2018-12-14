function getFormattedInput (input) {
    if (Array.isArray(input)) return input;

    switch (typeof input) {
    case "string":
    case "number": return input;
    case "boolean": return (input) ? "ooto" : "iro";
    }

    throw new Error("Yorlang system error: invalid result returned from helper function");
}

module.exports = getFormattedInput;
