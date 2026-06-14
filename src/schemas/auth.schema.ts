import { z } from "zod";
import { Role } from "../generated/client";
import type { AuthRequest } from "../controllers/index.controller";
import type { JwtPayload } from "../services/auth.service";

export const LoginSchema = z.object({
    email: z.email().max(255),
    password: z.string().min(6).max(32),
}) as z.ZodType<AuthRequest>;

export const JwtPayloadSchema = z.object({
    userId: z.string(),
    role: z.enum(Role),
}) satisfies z.ZodType<JwtPayload>;
