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
    describe("GET /users", () => {
        it("should return a empty list", async () => {
            const response = await factory.agent.get("/users");
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("users");
            expect(response.body.users).toStrictEqual([]);
        });
    });

    describe("POST /users", () => {
        it("should return a new user", async () => {
            const response = await factory.agent.post("/users").send({ email: "unknown@email.com", username: "unknown", password: "1", role: "root" });
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("email");
            expect(response.body).toHaveProperty("username");
            expect(response.body).toHaveProperty("password");
            expect(response.body).toHaveProperty("profile");
            expect(response.body).toHaveProperty("role");
        });
    });

    describe("GET /users/:id", () => {
        it("should return 'user not found'", async () => {
            const id = 1;
            const response = await factory.agent.get(`/users/${id}`);
            expect(response.status).toBe(404);
            expect(response.body).toHaveProperty("message");
            expect(response.body.message).toBe(`User ${id} not found.`);
        });
    });

    describe("PUT /users/:id", () => {
        it("should update user data", async () => {
            const id = 1;
            const response = await factory.agent.put(`/users/${id}`).send({ email: "unknown@email.com", username: "unknown", password: "1", role: "root" });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("id");
            expect(response.body).toHaveProperty("email");
            expect(response.body).toHaveProperty("username");
            expect(response.body).toHaveProperty("password");
            expect(response.body).toHaveProperty("profile");
            expect(response.body).toHaveProperty("role");
        });
    });
});
