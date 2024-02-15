import { Role, type User } from "../generated/client";
import { UserRepository } from "../repos";
import { BadRequestError, NotFoundError } from "../types";
import { HashUtils } from "../utils";

export type UserCreateArgs = Pick<User, "email" | "password" | "role">;
export type UserUpdateArgs = Partial<Pick<User, "email" | "password" | "role">>;

const validateRole = (value?: string | null): Role | undefined => {
    const normalized = value?.toUpperCase();
    return typeof normalized === "string" && normalized in Role ? (normalized as Role) : undefined;
};

const isValidEmail = (value?: string | null | undefined): boolean => {
    if (typeof value !== "string") return false;
    if (value.length > 255) return false;

    const at = value.indexOf("@");
    if (at <= 0 || at !== value.lastIndexOf("@")) return false;

    const domain = value.slice(at + 1);
    return domain.includes(".") && !domain.startsWith(".") && !domain.endsWith(".");
};

const isValidPassword = (value?: string | null | undefined): boolean => {
    return typeof value === "string" && value.length >= 6 && value.length <= 32;
};

export const get = async (id: bigint): Promise<User> => {
    const user = await UserRepository.findOne(id);
    if (!user) {
        throw new NotFoundError(`User ${id} not found.`);
    }
    return user;
};

export const fetch = async (): Promise<User[]> => {
    return UserRepository.fetch();
};

export const create = async (data: UserCreateArgs): Promise<User> => {
    const { email, password } = data;
    const role = validateRole(data.role);

    if (!email || !password) {
        throw new BadRequestError("email and password are required.");
    }

    if (!isValidEmail(email)) {
        throw new BadRequestError(`email '${email}' is invalid.`);
    }

    if (!isValidPassword(password)) {
        throw new BadRequestError("password must have between 6 adn 32 characteres.");
    }

    if (data.role && !role) {
        throw new BadRequestError("role is required.");
    }

    const hashed = await HashUtils.hash(password);
    console.log("PASSWORD", password, hashed, hashed.length);

    return UserRepository.create({
        email: email,
        password: hashed,
        role: role ?? Role.NONE,
    });
};

export const update = async (id: bigint, input: UserUpdateArgs): Promise<User> => {
    const { email, password } = input;
    const role = validateRole(input.role);

    if (email && isValidEmail(email)) {
        throw new BadRequestError(`email '${email}' is invalid.`);
    }

    if (password && isValidPassword(password)) {
        throw new BadRequestError("password must have between 6 adn 32 characteres.");
    }

    if (input.role && !role) {
        throw new BadRequestError(`role '${input.role} is invalid.`);
    }

    const data: Parameters<typeof UserRepository.update>[1] = {};

    if (typeof email === "string") {
        data.email = email;
    }

    if (typeof password === "string") {
        data.password = await HashUtils.hash(password);
    }

    if (role) {
        data.role = role;
    }

    if (Object.keys(data).length === 0) {
        throw new BadRequestError("no fields to update");
    }

    return UserRepository.update(id, data);
};
