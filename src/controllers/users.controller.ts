import { Context, Next } from "koa";
import { IUser } from "../types/user";

const randomInt = (max: number = Number.MAX_VALUE, min: number = 0): number => {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

// GET /user
export const fetch = async (ctx: Context, next: Next) => {
	ctx.status = 200;
	ctx.body = { users: [] };
};

// POST /user
export const save = async (ctx: Context, next: Next) => {
	const body = ctx.request.body as Partial<IUser>;
	if (!body.email || !body.password) {
		ctx.status = 400;
		ctx.body = { message: "Email and password are required." };
		return;
	}

	if (!body.username) {
		ctx.status = 400;
		ctx.body = { message: "Username is required." };
		return;
	}

	const user: IUser = {
		id: randomInt(),
		email: body.email ?? null,
		username: body.username ?? null,
		password: body.password ?? null,
		profile: body.profile ?? "NONE",
		role: body.role ?? "NONE",
	};

	ctx.status = 201;
	ctx.body = user;
};

// GET /user/:id
export const get = async (ctx: Context, next: Next) => {
	const id = Number(ctx.params.id) || 0;
	ctx.status = 404;
	ctx.body = { message: `User ${id} not found.` };
};

// PUT /user/:id
export const update = async (ctx: Context, next: Next) => {
	const id = Number(ctx.params.id) || 0;

	const body = ctx.request.body as Partial<IUser>;
	if (!body.email || !body.password) {
		ctx.status = 400;
		ctx.body = { message: "Email and password are required." };
		return;
	}

	if (!body.username) {
		ctx.status = 400;
		ctx.body = { message: "Username is required." };
		return;
	}

	const user: IUser = {
		id: id,
		email: body.email ?? null,
		username: body.username ?? null,
		password: body.password ?? null,
		profile: body.profile ?? "NONE",
		role: body.role ?? "NONE",
	};

	ctx.status = 200;
	ctx.body = user;
};
