import { expect, describe, it, afterAll, beforeAll } from "@jest/globals";

import { TestFactory } from "../factory";

const factory = new TestFactory();

beforeAll(async () => {
    await factory.init();
})

afterAll(async () => {
    await factory.close();
});

describe("file-storage controller", () => {
    describe("POST /api/fs", () => {
        it("should return a file_storage", async () => {
            const response = await factory.agent.post("/api/fs").attach("file", "docs/test.txt");

            expect(response.status).toBe(201);

            expect(response.body).toHaveProperty("file_storage");

            const file_storage = response.body.file_storage;
            expect(file_storage).toBeDefined();

            expect(file_storage).toHaveProperty("hash");
            expect(typeof file_storage.hash).toBe("string");

            expect(file_storage).toHaveProperty("path");
            expect(typeof file_storage.path).toBe("string");

            expect(file_storage).toHaveProperty("filename", "test.txt");
            expect(file_storage).toHaveProperty("extension", "txt");
            expect(file_storage).toHaveProperty("content_type", "text/plain");
            expect(file_storage).toHaveProperty("size");
            expect(typeof file_storage.size).toBe("number");
            expect(file_storage.size).toBeGreaterThan(0);

            expect(file_storage).toHaveProperty("content");
            expect(file_storage.content).toHaveProperty("type", "Buffer");
            expect(file_storage.content).toHaveProperty("data");
            expect(file_storage.content.data).toBeInstanceOf(Array);

            expect(response.body).toHaveProperty("content", "Hello World\n");
        });
    });
});
