const ebi = require("../../../helperise/object_helpers/ebi.js");

describe("Ebi Test suite", () => {

    describe('no args', () => {
        test("It should return an empty object", () => {
            expect(ebi()).toEqual({});
        });
    })

    describe('null arg', () => {
        test("It should return an empty object", () => {
            expect(ebi(null)).toEqual({});
        });
    })

    describe('empty array arg', () => {
        test("It should return an empty object", () => {
            expect(ebi([])).toEqual({});
        });
    })

    describe('key->value args', () => {
        test("It should return an object { key: 'value' }", () => {
            expect(ebi([ 'key', 'value' ])).toEqual({ key: 'value' });
        });
    })

    describe('multiple key->value args', () => {
        test("It should return an object { key1: 'value1', key2: 'value2' }", () => {
            expect(ebi([ 'key1', 'value1', 'key2', 'value2' ])).toEqual({ key1: 'value1', key2: 'value2' });
        });
    })

    describe('object args', () => {
        test("It should return an object { key: 'value' }", () => {
            expect(ebi([ { key: 'value' } ])).toEqual({ key: 'value' });
        });
    })

    describe('multiple object args', () => {
        test("It should return an object { key1: 'value1', key2: 'value2' }", () => {
            expect(ebi([ { key1: 'value1' }, { key2: 'value2' } ])).toEqual({ key1: 'value1', key2: 'value2' });
        });
    })

    describe('mixed object and key->value args', () => {
        test("It should return an object { key1: 'value1', key2: 'value2' }", () => {
            expect(ebi([ { key1: 'value1' }, 'key2', 'value2' ])).toEqual({ key1: 'value1', key2: 'value2' });
        });
    })
});
