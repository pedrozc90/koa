import type { Context } from "koa";
import type { StoredFile } from "../generated/client";
import { BadRequestError, NotFoundError } from "../types";
import { FileUtils, toBigInt, toInt } from "../utils";
import { StoredFileService } from "../services";

type StoredFileDto = {
    id: string;
    inserted_at: string;
    updated_at: string;
    version: number;
    hash: string;
    filename: string;
    content_type: string;
    size: string;
    object_key?: string;
    etag?: string;
};

const toDto = (file: StoredFile | null): StoredFileDto | null => {
    if (!file) return null;
    return {
        id: file.id.toString(),
        inserted_at: file.insertedAt.toISOString(),
        updated_at: file.updatedAt.toISOString(),
        version: file.version,
        hash: file.hash,
        filename: file.filename,
        content_type: file.contentType,
        size: FileUtils.prettyBytes(file.size),
        ...(file.objectKey ? { object_key: file.objectKey } : {}),
        ...(file.etag ? { etag: file.etag } : {}),
    };
};

type ListQuery = {
    page: number;
    rows: number;
    q?: string;
};

const parseListQuery = (ctx: Context): ListQuery => {
    const obj: ListQuery = {
        page: toInt(ctx.query["page"]) ?? 1,
        rows: toInt(ctx.query["rows"]) ?? 15,
    };

    if (typeof ctx.query["q"] === "string") {
        obj.q = ctx.query["q"];
    }

    return obj;
};

export const fetch = async (ctx: Context) => {
    const args = parseListQuery(ctx);
    const list = await StoredFileService.fetch(args);
    ctx.status = 200;
    ctx.body = list.map((v) => toDto(v));
};

export const upload = async (ctx: Context) => {
    const file = ctx["file"];
    if (!file) {
        throw new BadRequestError("File not found.");
    }

    // Buffer.from() produces a Buffer backed by a plain ArrayBuffer,
    // satisfying Prisma's Bytes (Uint8Array<ArrayBuffer>) type.
    const content = Buffer.from(file.buffer.buffer, file.buffer.byteOffset, file.buffer.byteLength) as Uint8Array<ArrayBuffer>;

    const sf = await StoredFileService.create({
        filename: file.originalname ?? file.filename,
        contentType: file.mimetype,
        content: content,
        size: toBigInt(file.size) ?? BigInt(0),
    });

    const result = toDto(sf as StoredFile);

    ctx.status = 201;
    ctx.body = result;
};

export const download = async (ctx: Context) => {
    const id = toBigInt(ctx["params"]["id"]);
    if (!id) throw new BadRequestError("id is required");

    const sf = await StoredFileService.get(id);

    const content = await StoredFileService.getContent(id);
    if (!content) throw new NotFoundError("File content not found");

    ctx.type = sf.contentType; // Content-Type
    ctx.length = content.byteLength; // Content-Length
    ctx.attachment(sf.filename, { type: "attachment" }); // Content-Disposition
    ctx.status = 200;
    ctx.body = content;
};

export const remove = async (ctx: Context) => {
    const id = toBigInt(ctx["params"]["id"]);
    if (!id) throw new BadRequestError("id is required");
    const sf = await StoredFileService.remove(id);
    ctx.status = 200;
    ctx.body = { message: `File ${sf.filename} deleted.` };
};
