function getFormattedReturnValue (returnedValue) {
    switch (typeof returnedValue) {
    case "string":
    case "number": return returnedValue;
    case "boolean": return (returnedValue) ? "ooto" : "iro";
    case "object": if (Array.isArray(returnedValue)) return returnedValue;
    }

    throw new Error("Yorlang system error: invalid result returned from helper function");
}

module.exports = getFormattedReturnValue;
