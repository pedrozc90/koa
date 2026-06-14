import type { User } from "../generated/client";
import { prisma } from "../libs";
import { ConflictError, NotFoundError } from "../types";
import { PrismaUtils } from "../utils";

export const findOne = async (where: { id: bigint } | { email: string }): Promise<User | null> => {
    if (Object.keys(where).length === 0) return null;
    return prisma.user.findUnique({
        where: { ...where },
    });
};

export const fetch = async (): Promise<User[]> => {
    return prisma.user.findMany({
        orderBy: {
            id: "asc",
        },
    });
};

export const create = async (data: Pick<User, "email" | "password" | "role">): Promise<User> => {
    try {
        return prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                role: data.role,
                version: 1,
            },
        });
    } catch (e) {
        if (PrismaUtils.isError(e, "P2002")) {
            throw new ConflictError("email already exists", e);
        }
        const ex = PrismaUtils.map(e);
        throw ex ?? e;
    }
};

export const update = async (id: bigint, data: Partial<Pick<User, "email" | "password" | "role">>): Promise<User> => {
    try {
        return prisma.user.update({
            where: { id: id },
            data: {
                ...data,
                version: { increment: 1 },
            },
        });
    } catch (e) {
        if (PrismaUtils.isError(e, "P2002")) {
            throw new ConflictError("email already exists", e);
        }

        if (PrismaUtils.isError(e, "P2025")) {
            throw new NotFoundError(`user '${id}' not found`, e);
        }
        const ex = PrismaUtils.map(e);
        throw ex ?? e;
    }
};

export const remove = async (id: bigint): Promise<User> => {
    try {
        return prisma.user.delete({
            where: { id: id },
        });
    } catch (e) {
        const ex = PrismaUtils.map(e);
        throw ex ?? e;
    }
};
