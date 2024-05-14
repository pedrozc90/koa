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
        it("should return paged list", async () => {
            const page = 1;
            const rpp = 10;
            const response = await factory.agent.get(`/file-storage?page=${ page }&rpp=${ rpp }`);

            expect(response.status).toBe(200);

            const body = response.body;
            expect(body).toHaveProperty("page");
            expect(typeof body.page).toBe("number");
            expect(body).toHaveProperty("rpp");
            expect(typeof body.rpp).toBe("number");
            expect(body).toHaveProperty("count");
            expect(typeof body.count).toBe("number");
            expect(body).toHaveProperty("list");
            expect(Array.isArray(body.list)).toBe(true);
        });
    });

    describe("POST /file-storage", () => {
        it("should return a body", async () => {
            const response = await factory.agent.post("/file-storage").attach("file", "docs/test.txt");

            expect(response.status).toBe(201);

            const body = response.body;
            expect(body).toBeDefined();

            expect(body).toHaveProperty("hash");
            expect(typeof body.hash).toBe("string");

            expect(body).toHaveProperty("filename", "test.txt");
            expect(body).toHaveProperty("extension", "txt");
            expect(body).toHaveProperty("content_type", "text/plain");
            expect(body).toHaveProperty("size");
            expect(typeof body.size).toBe("number");
            expect(body.size).toBeGreaterThan(0);
        });
    });

    describe("GET /file-storage/:id", () => {
        it("should return one file_storate", async () => {
            const id = 1;
            const response = await factory.agent.get(`/file-storage/${ id }`);

            expect(response.status).toBe(200);

            const body = response.body;
            expect(body).toHaveProperty("id");
            expect(body).toHaveProperty("hash");
            expect(body).toHaveProperty("filename");
            expect(body).toHaveProperty("extension");
            expect(body).toHaveProperty("content_type");
            expect(body).toHaveProperty("size");
            expect(body).not.toHaveProperty("content");
        });
    });

    describe("GET /file-storage", () => {
        it("should return file_storage not found", async () => {
            const id = 1_000;
            const response = await factory.agent.get(`/file-storage/${ id }`);
            expect(response.status).toBe(404);
        });
    });

    describe("GET /file-storage/:id/content", () => {
        it("should return a file_storage content", async () => {
            const id = 1;
            const response = await factory.agent.get(`/file-storage/${ id }/content`);
            expect(response.status).toBe(200);
        });
    });
});
