import { expect, describe, it, afterAll, beforeAll } from "@jest/globals";

import { TestFactory } from "../factory";

const factory = new TestFactory();

beforeAll(async () => {
    await factory.init();
})

afterAll(async () => {
    await factory.close();
});

describe("root controller", () => {
    describe("GET /", () => {
        it("should redirect to /ping", async () => {
            const response = await factory.agent.get("/");
            expect(response.header.location).toBe("ping");
        });
    });

    describe("GET /ping", () => {
        it("should return system info", async () => {
            const response = await factory.agent.get("/ping");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("env", "test");
            expect(response.body).toHaveProperty("time_zone");
            expect(response.body).toHaveProperty("timestamp");
            expect(response.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/g);
            expect(response.body).toHaveProperty("local_timestamp");
            expect(response.body.local_timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}$/g);
            expect(response.body).toHaveProperty("app");
            expect(response.body.app).toHaveProperty("name");
            expect(response.body.app).toHaveProperty("version");
            expect(response.body.app.version).toMatch(/\d+\.\d+\.\d+/g);
        });
    });
});
