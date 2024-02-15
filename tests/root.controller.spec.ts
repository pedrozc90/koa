import { expect, describe, it, afterAll } from "@jest/globals";
import supertest from "supertest";

import app from "../src/app";

const server = app.listen();
const request = supertest.agent(server);

afterAll(() => {
    server.close();
});

describe("root controller", () => {
    describe("GET /", () => {
        it("should redirect to /ping", async () => {
            const response = await request.get("/");
            expect(response.header.location).toBe("ping");
        });
    });

    describe("GET /ping", () => {
        it("should return system info", async () => {
            const response = await request.get("/ping");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("env");
            expect(response.body.env).toBe("test");
            expect(response.body).toHaveProperty("timestamp");
            expect(response.body.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}Z$/g);
            expect(response.body).toHaveProperty("timestamp_locale");
            expect(response.body.timestamp_locale).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}\:\d{2}\:\d{2}\.\d{3}$/g);
            expect(response.body).toHaveProperty("timezone");
            expect(response.body).toHaveProperty("app");
            expect(response.body.app).toHaveProperty("name");
            expect(response.body.app).toHaveProperty("version");
            expect(response.body.app.version).toMatch(/\d+\.\d+\.\d+/g);
        });
    });
});
