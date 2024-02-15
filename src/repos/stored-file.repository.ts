import type { Prisma, StoredFile } from "../generated/client";
import { prisma } from "../libs";
import { ConflictError, NotFoundError } from "../types";
import { PrismaUtils } from "../utils";

export type StoredFileMeta = Prisma.StoredFileGetPayload<{
    omit: { content: true };
}>;

export type StoredFileInput = Pick<StoredFile, "hash" | "filename" | "contentType" | "content" | "size" | "storageType">;

export const findOne = async (args: Pick<StoredFile, "id"> | Pick<StoredFile, "hash">): Promise<StoredFileMeta | null> => {
    return prisma.storedFile.findUnique({
        where: { ...args },
        omit: { content: true },
    });
};

export const getContent = async (id: bigint) => {
    try {
        return prisma.storedFile
            .findUnique({
                select: { content: true },
                where: { id: id },
            })
            .then((res) => res?.content ?? null);
    } catch (e) {
        const ex = PrismaUtils.map(e);
        throw ex ?? e;
    }
};

export const fetch = async ({ page = 1, rows = 15, q }: { page: number; rows: number; q?: string }): Promise<StoredFile[]> => {
    const limit = rows;
    const offset = (page - 1) * rows;
    return prisma.storedFile.findMany({
        where: {
            ...(typeof q === "string" ? { filename: q } : {}),
        },
        orderBy: {
            id: "asc",
        },
        skip: offset,
        take: limit,
    });
};

export const create = async ({
    storageType = "local",
    hash,
    filename,
    contentType,
    content,
    size = BigInt(0),
}: StoredFileInput): Promise<StoredFile> => {
    try {
        return prisma.storedFile.create({
            data: {
                storageType: storageType,
                objectKey: null,
                etag: null,
                hash: hash,
                filename: filename,
                contentType: contentType,
                content: content,
                size: size,
            },
        });
    } catch (e) {
        if (PrismaUtils.isError(e, "P2002")) {
            throw new ConflictError(`Unique constraint violation, file hash '${hash}' already exists`, e);
        }
        const ex = PrismaUtils.map(e);
        throw ex ?? e;
    }
};

export const update = async (id: bigint, data: Partial<Pick<StoredFile, "filename">>): Promise<StoredFile> => {
    try {
        return prisma.storedFile.update({
            where: { id: id },
            data: {
                ...data,
                version: { increment: 1 },
            },
        });
    } catch (e) {
        if (PrismaUtils.isError(e, "P2025")) {
            throw new NotFoundError(`stored_file '${id}' not found`, e);
        }
        const ex = PrismaUtils.map(e);
        throw ex ?? e;
    }
};

export const remove = async (id: bigint): Promise<StoredFile> => {
    try {
        return prisma.storedFile.delete({ where: { id: id } });
    } catch (e) {
        if (PrismaUtils.isError(e, "P2025")) {
            throw new NotFoundError(`stored_file '${id}' not found`, e);
        }
        const ex = PrismaUtils.map(e);
        throw ex ?? e;
    }
};
