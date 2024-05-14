import { Context, Next } from "koa";
import { IUser } from "../types";

const randomInt = (max: number = Number.MAX_VALUE, min: number = 0): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// GET /user
export const fetch = async (ctx: Context, next: Next) => {
    ctx.status = 200;
    ctx.body = { users: [] };
}

// POST /user
export const save = async (ctx: Context, next: Next) => {
    const user = {
        id: randomInt(),
        email: ctx.request.body.email || null,
        username: ctx.request.body.username || null,
        password: ctx.request.body.password || null,
        profile: ctx.request.body.profile || null,
        role: ctx.request.body.role || null
    } as IUser;

    ctx.status = 201;
    ctx.body = user;
}

// GET /user/:id
export const get = async (ctx: Context, next: Next) => {
    const id = Number(ctx.params.id) || 0;
    ctx.status = 404;
    ctx.body = { message: `User ${id} not found.` };
}

// PUT /user/:id
export const update = async (ctx: Context, next: Next) => {
    const id = Number(ctx.params.id) || 0;
    const user = {
        id: id,
        email: ctx.request.body.email || null,
        username: ctx.request.body.username || null,
        password: ctx.request.body.password || null,
        profile: ctx.request.body.profile || null,
        role: ctx.request.body.role || null
    } as IUser;

    ctx.status = 200;
    ctx.body = user;
}
