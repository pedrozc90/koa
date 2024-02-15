import type { Context } from "koa";
import type { Role, User } from "../generated/client";
import { toBigInt } from "../utils";
import { UserService } from "../services";
import { BadRequestError } from "../types";
import type { UserCreateArgs, UserUpdateArgs } from "../services/user.service";

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

// const isUserCreateArgs = (val: unknown): val is UserCreateArgs => {
//     return (
//         typeof val === "object" &&
//         val !== null &&
//         "email" in val &&
//         typeof val.email === "string" &&
//         "password" in val &&
//         typeof val.password === "string"
//         // && ("role" in val)
//     );
// };

// const isUserUpdateArgs = (val: unknown): val is UserUpdateArgs => {
//     return (
//         typeof val === "object" &&
//         val !== null &&
//         "email" in val &&
//         (typeof val.email === "string" || typeof val.email === "undefined") &&
//         "pasword" in val &&
//         (typeof val.pasword === "string" || typeof val.pasword === "undefined") &&
//         "roles" in val &&
//         (typeof val.roles === "string" || typeof val.roles === "undefined")
//     );
// };

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

    const user = await UserService.get(id);

    ctx.status = 200;
    ctx.body = toDto(user);
};

export const create = async (ctx: Context) => {
    const data = ctx.request.body as UserCreateArgs;
    const user = await UserService.create(data);

    ctx.status = 201;
    ctx.body = toDto(user);
};

export const update = async (ctx: Context) => {
    const id = toBigInt(ctx["params"]["id"]);
    if (!id) {
        throw new BadRequestError("id is required");
    }

    const data = ctx.request.body as UserUpdateArgs;
    const user = await UserService.update(id, data);

    ctx.status = 200;
    ctx.body = toDto(user);
};
