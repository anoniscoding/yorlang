const omo = require("../../../helperise/object_helpers/omo.js");

describe("Omo Test suite", () => {

    test("It should return undefined", () => {
        expect(omo([ {}, 'name' ])).toBe(undefined);
    });

    test("It should return yorlang", () => {
        expect(omo([ {}, 'name', 'yorlang' ])).toBe('yorlang');
    });

    test("It should return yorlang", () => {
        expect(omo([ { name: 'yorlang' }, 'name' ])).toBe('yorlang');
    });

    test("It should return yorlang2", () => {
        expect(omo([ { name: 'yorlang' }, 'name', 'yorlang2' ])).toBe('yorlang2');
    });
});
