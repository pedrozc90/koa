import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globals: true,
        environment: "node",
        include: ["src/**/*.test.ts", "src/**/*.spec.ts"],
        env: {
            NODE_ENV: "test",
            DATABASE_URL: "postgresql://postgres:postgres@localhost:5432/express?schema=public",
            HASHING_SALT: "10",
            HASHING_PEPPER: "test",
        },
    },
});
