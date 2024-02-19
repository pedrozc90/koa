import fs from "fs";
import path from "path";
import { Context, Next } from "koa";

import { IFileStorage, Page } from "../types";
import { createHash } from "../utils";

export const fetch = async (ctx: Context, next: Next) => {
    const page = Number(ctx.query.page) || 1;
    const rpp = Number(ctx.query.rpp) || undefined;
    
    const list: any[] = ["Dockerfile", "docker-compose.yml", "package.json", "README.md"]
        .map((filename) => {
            try {
                const content = fs.readFileSync(filename);

                const obj = {} as IFileStorage;
                obj.path = filename;
                obj.filename = filename;
                obj.extension = path.extname(filename).substring(1);
                obj.content_type = "text/plain";
                obj.content = content;
                obj.size = content.length;
                return obj;
            } catch (e) {
                return null;
            }
        });

    ctx.status = 200
    ctx.body = Page.of<IFileStorage>(list, page, rpp, list.length);
}

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

export const get = async (ctx: Context, next: Next) => {
    const id = Number(ctx.params.id) || 0;
    ctx.throw(501, "Method Not Implemented.");
}

export const getContent = async (ctx: Context, next: Next) => {
    const id = Number(ctx.params.id) || 0;
    ctx.throw(501, "Method Not Implemented.");
}
