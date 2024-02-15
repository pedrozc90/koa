import crypto from "crypto";

export function createHash(content: string | Buffer): string {
    return crypto.createHash("shake256")
        .update(content)
        .digest("hex");
}
