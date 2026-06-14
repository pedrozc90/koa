import { z } from "zod";
import { Role } from "../generated/client";
import type { UserCreateArgs } from "../services/user.service";

export const UserCreateSchema = z.object({
    email: z.email().max(255),
    password: z.string().min(6).max(32),
}) satisfies z.ZodType<UserCreateArgs>;

export const UserUpdateSchema = z
    .object({
        email: z.email().max(255).optional(),
        password: z.string().min(6).max(32).optional(),
        role: z.enum(Role).optional(),
    })
    .refine((data) => Object.keys(data).length > 0, {
        message: "At least one field must be provided.",
    });
