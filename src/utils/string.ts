import crypto from "crypto";

export function leftPad(str: string, length: number, fill: string): string {
    if (str.length >= length) return str;
    return fill.repeat(length - str.length) + str;
}

export function rightPad(str: string, length: number, fill: string): string {
    if (str.length >= length) return str;
    return str + fill.repeat(length - str.length);
}
