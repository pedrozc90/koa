import { expect, describe, it } from "@jest/globals";

import { leftPad, rightPad, createHash, toLocalTimestamp } from "../src/utils";
import crypto from "crypto";

describe("DateTimeUtils", () => {
    describe("toLocalTimestamp", () => {
        it("should return the same value", async () => {
            const dt = new Date();
            expect(dt.toISOString()).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/g);

            const ldt = toLocalTimestamp(dt, "America/Sao_Paulo")
            expect(ldt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}$/g);
        });
    });
});

describe("StringUtils", () => {
    describe("Left Padding", () => {
        it("should add 'x's to the left of the string", async () => {
            const pad = leftPad("0123456789", 12, "x");
            expect(pad).toBe("xx0123456789");
        });

        it("should return the same string", async () => {
            const pad = leftPad("0123456789", 8, "x");
            expect(pad).toBe("0123456789");
        });
    });

    describe("Right Padding", () => {
        it("should add 'x's to the right of the string", async () => {
            const pad = rightPad("0123456789", 12, "x");
            expect(pad).toBe("0123456789xx");
        });

        it("should return the same string", async () => {
            const pad = rightPad("0123456789", 5, "x");
            expect(pad).toBe("0123456789");
        });
    });
});

describe("HashUtils", () => {
    describe("hash", () => {
        it("should return the same value", async () => {
            const hash = crypto.createHash("sha256")
                .update("PEDRO")
                .digest("hex");
            expect(hash).toBeDefined();
        });

        it("should return the same value", async () => {
            const s = createHash("PEDRO");
            expect(s).toBe("2c86ba863363265fac2e37c96c6a041d8974be226b91c063c71eac7b4f6e1c38");
            
            const t = createHash("pedro");
            expect(t).toBe("adcdb9b33be88c9e26637d32dcb66a8e8bb3bc657664ea9e9d9a94ddd2b16d2a");

            expect(s).not.toStrictEqual(t);
        });
    });
});
