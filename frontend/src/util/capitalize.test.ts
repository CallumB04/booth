import { describe, expect, it } from "vitest";
import { capitalize } from "./capitalize";

describe("capitalize", () => {
    it("returns capitalized string when given lowercase string", () => {
        const expected = "Hello";
        const actual = capitalize("hello");
        expect(expected).toBe(actual);
    });
    it("returns capitalized character when given lowercase character", () => {
        const expected = "A";
        const actual = capitalize("a");
        expect(expected).toBe(actual);
    });
    it("returns capitalized string when given already capitalized string", () => {
        const expected = "Hello";
        const actual = capitalize("Hello");
        expect(expected).toBe(actual);
    });
    it("returns capitalized character when given already capitalized character", () => {
        const expected = "A";
        const actual = capitalize("A");
        expect(expected).toBe(actual);
    });
    it("returns empty string when given empty string", () => {
        const expected = "";
        const actual = capitalize("");
        expect(expected).toBe(actual);
    });
    it("returns integer when given integer (stringified)", () => {
        const expected = "1";
        const actual = capitalize("1");
        expect(expected).toBe(actual);
    });
    it("returns 2 digit integer when given 2 digit integer (stringified)", () => {
        const expected = "12";
        const actual = capitalize("12");
        expect(expected).toBe(actual);
    });
    it("returns uppercase string when given uppercase string", () => {
        const expected = "HELLO";
        const actual = capitalize("HELLO");
        expect(expected).toBe(actual);
    });
    it("returns emoji when given emoji", () => {
        const expected = "✅";
        const actual = capitalize("✅");
        expect(expected).toBe(actual);
    });
    it("returns newline character when given newline character", () => {
        const expected = "\n";
        const actual = capitalize("\n");
        expect(expected).toBe(actual);
    });
    it("returns empty space when given empty space", () => {
        const expected = " ";
        const actual = capitalize(" ");
        expect(expected).toBe(actual);
    });
});
