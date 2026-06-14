import jwt from "jsonwebtoken";
import { settings } from "../settings";
import { UserService } from ".";
import { UnauthorizedError } from "../types";
import { HashUtils } from "../utils";
import { JwtPayloadSchema } from "../schemas";

const { secret, issuer, expiresIn } = settings.jwt;

export interface JwtPayload {
    userId: string;
    role: "NONE" | "NORMAL" | "MASTER";
}

export interface JwtEncodeArgs extends JwtPayload {
    subject: string;
}

export const encode = (args: JwtEncodeArgs): string => {
    const payload: JwtPayload = {
        userId: args.userId,
        role: args.role,
    };
    return jwt.sign(payload, secret, {
        algorithm: "HS256",
        issuer: issuer,
        subject: args.subject,
        expiresIn: expiresIn,
    });
};

export const decode = (token: string): JwtPayload => {
    try {
        const payload = jwt.verify(token, secret, {
            algorithms: ["HS256"],
            issuer: issuer,
        });

        if (typeof payload === "string") {
            throw new UnauthorizedError("Invalid token payload");
        }

        return JwtPayloadSchema.parse(payload);
    } catch (e) {
        console.error(e);
        if (e instanceof jwt.TokenExpiredError) {
            throw new UnauthorizedError(`Token expired at ${e.expiredAt.toISOString()}`, e);
        }
        throw new UnauthorizedError("Invalid token", e);
    }
};

export const login = async (email: string, password: string): Promise<string> => {
    const user = await UserService.get({ email });

    const match = await HashUtils.compare(password, user?.password ?? "");
    if (!match) {
        throw new UnauthorizedError("Invalid email or password");
    }

    return encode({
        subject: user.email,
        userId: user.id.toString(),
        role: user.role,
    });
};
