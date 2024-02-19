import fs from "fs";
import { Context, Next } from "koa";

import { createHash } from "../utils";
import { FileStorage } from "../entities";
import { fileStorageService } from "../services";
import { Page } from "../types";

export const fetch = async (ctx: Context, next: Next) => {
    const page = Number(ctx.query.page) || 1;
    const rpp = Number(ctx.query.rpp) || undefined;
    const q = ctx.query.q;

    let query = fileStorageService.repo.createQueryBuilder("fs");

    if (q) {
        query = query.where("fs.filename = :filename", { filename: q })
    }

    const total = await query.getCount();

    if (rpp) {
        query = query.offset((page - 1) * rpp).limit(rpp);
    }
    
    const list = await query.orderBy("fs.filename", "ASC").getMany();

    ctx.status = 200
    ctx.body = Page.of<FileStorage>(list, 1, 15, list.length);
}

export const upload = async (ctx: Context, next: Next) => {
    const file = ctx.file;

    try {
        // read file content into buffer
        const fs_content = fs.readFileSync(file.path);
        const fs_data = fileStorageService.create(file, fs_content);

        const file_storage = await fileStorageService.save(fs_data);

        const { content, ...body } = file_storage;

        ctx.status = 201;
        ctx.body = body;
    } catch (error) {
        console.error("File upload failed. Reason:", error);
        ctx.throw(400, { error: error });
    } finally {
        // optionally, you can remove the temporary file after reading its content
        fs.unlinkSync(file.path);
    }
}

export const get = async (ctx: Context, next: Next) => {
    const id = Number(ctx.params.id) || 0;
    const file_storage = await fileStorageService.getById(id);
    if (!file_storage) {
        ctx.throw(404, `File storage (id: ${ id }) not found.`);
    }

    ctx.status = 200;
    ctx.body = file_storage;
}

export const getContent = async (ctx: Context, next: Next) => {
    const id = Number(ctx.params.id) || 0;
    const file_storage = await fileStorageService.getWithContent(id);
    if (!file_storage) {
        ctx.throw(404, `File storage (id: ${ id }) not found.`);
    }

    ctx.status = 200;
    ctx.type = file_storage.content_type;
    ctx.body = file_storage.content;
}

export const generate = async (ctx: Context, next: Next) => {
    const now = Date.now();
    const hash = createHash(now.toString());
    const data = fileStorageService.create(`${hash}.txt`, Buffer.from(hash), "text/plain");
    const file_storage = await fileStorageService.save(data);
    const { content, ...body } = file_storage;

    ctx.status = 201;
    ctx.body = body;
}
