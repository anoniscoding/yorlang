function getFormattedInput (input) {
    switch (typeof input) {
    case "string":
    case "number": return input;
    case "boolean": return (input) ? "ooto" : "iro";
    case "object": if (Array.isArray(input)) return input;
    }

    throw new Error("Yorlang system error: invalid result returned from helper function");
}

module.exports = getFormattedInput;
