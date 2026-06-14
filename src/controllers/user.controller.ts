import type { Context } from "koa";
import type { Role, User } from "../generated/client";
import { UserCreateSchema, UserUpdateSchema } from "../schemas";
import { UserService } from "../services";
import { BadRequestError } from "../types";
import { removeUndefined, toBigInt } from "../utils";

type UserDto = {
    id: string;
    inserted_at: string;
    updated_at: string;
    version: number;
    email: string;
    role: Role;
};

const toDto = (user: User | null): UserDto | null => {
    if (!user) return null;
    return {
        id: user.id.toString(),
        email: user.email,
        inserted_at: user.insertedAt.toISOString(),
        updated_at: user.updatedAt.toISOString(),
        version: user.version,
        role: user.role,
    };
};

export const fetch = async (ctx: Context) => {
    const list = await UserService.fetch();

    const result = list.map((u) => toDto(u));

    ctx.status = 200;
    ctx.body = result;
};

export const get = async (ctx: Context) => {
    const id = toBigInt(ctx["params"]["id"]);
    if (!id) {
        throw new BadRequestError("id is required");
    }

    const user = await UserService.get({ id });

    ctx.status = 200;
    ctx.body = toDto(user);
};

export const create = async (ctx: Context) => {
    const data = UserCreateSchema.parse(ctx.request.body);
    const user = await UserService.create(data);

    ctx.status = 201;
    ctx.body = toDto(user);
};

export const update = async (ctx: Context) => {
    const id = toBigInt(ctx["params"]["id"]);
    if (!id) {
        throw new BadRequestError("id is required");
    }

    const data = removeUndefined(UserUpdateSchema.parse(ctx.request.body));
    const user = await UserService.update(id, data);

    ctx.status = 200;
    ctx.body = toDto(user);
};

export const remove = async (ctx: Context) => {
    const id = toBigInt(ctx["params"]["id"]);
    if (!id) {
        throw new BadRequestError("id is required");
    }

    const user = await UserService.remove(id);

    ctx.status = 200;
    ctx.body = { message: `User ${user.email} removed` };
};
