import fs from "fs";
import path from "path";
import { Context, Next } from "koa";

import { IFileStorage } from "../types";
import { createHash } from "../utils";

export const upload = async (ctx: Context, next: Next) => {
    const file = ctx.file;

    const file_storage = {
        path: file.path,
        filename: file.originalname,
        extension: path.extname(file.originalname || "").substring(1),
        content_type: file.mimetype,
        encoding: "utf-8",
        size: file.size,
        content: file.buffer
    } as IFileStorage;

    try {
        // read file content into buffer
        file_storage.content = fs.readFileSync(file_storage.path);

        // compute hash using some hash algorithm
        // you'll need to implement a function to compute the hash
        file_storage.hash = createHash(file_storage.content);

        // now you have your ifilestorage object ready
        ctx.status = 201;
        ctx.body = {
            file_storage: file_storage,
            content: file_storage.content.toString("utf-8")
        };
    } catch (error: unknown) {
        console.error("Failed to process file. Reason:", error);
        ctx.throw(400, { error: error });
    } finally {
        // optionally, you can remove the temporary file after reading its content
        fs.unlinkSync(file_storage.path);
    }
}
