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
    describe("GET /file-storage", () => {
        it("should return a paged list", async () => {
            const page = 1;
            const rpp = 2;
            const response = await factory.agent.get(`/file-storage?page=${ page }&rpp=${ rpp }`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("page", page);
            expect(response.body).toHaveProperty("rpp", rpp);
            expect(response.body).toHaveProperty("count");
            expect(response.body).toHaveProperty("list");
            expect(response.body.list.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe("POST /file-storage", () => {
        it("should register a new file_storage", async () => {
            const response = await factory.agent.post("/file-storage").attach("file", "docs/test.txt");

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

    describe("GET /file-storage", () => {
        it("should return a file_storage", async () => {
            const id = 1;
            const response = await factory.agent.get(`/file-storage/${ id }`);
            expect(response.status).toBe(501);
            // expect(response.body).toHaveProperty("id");
            // expect(response.body).toHaveProperty("hash");
            // expect(response.body).toHaveProperty("filename");
            // expect(response.body).toHaveProperty("extension");
            // expect(response.body).toHaveProperty("content_type");
            // expect(response.body).toHaveProperty("size");
            // expect(response.body).toHaveProperty("content");
        });
    });

    describe("GET /file-storage", () => {
        it("should return a file_storage", async () => {
            const id = 1;
            const response = await factory.agent.get(`/file-storage/${ id }/content`);
            expect(response.status).toBe(501);
            // expect(response.body).toHaveProperty("id");
            // expect(response.body).toHaveProperty("hash");
            // expect(response.body).toHaveProperty("filename");
            // expect(response.body).toHaveProperty("extension");
            // expect(response.body).toHaveProperty("content_type");
            // expect(response.body).toHaveProperty("size");
            // expect(response.body).toHaveProperty("content");
        });
    });
});
