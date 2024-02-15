export function toLocalTimestamp(dt: Date, time_zone: string): string {
    const formatter = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        fractionalSecondDigits: 3,
        hour12: false,
        timeZone: time_zone
    });

    const parts = formatter.formatToParts(dt);

    const month = parts[0].value;
    const day = parts[2].value;
    const year = parts[4].value;
    const hours = parts[6].value;
    const minutes = parts[8].value;
    const seconds = parts[10].value;
    const milliseconds = (parts.length >= 12) ? parts[12].value : "000";

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
}

const MINUTE: number = 60;
const HOUR: number = 3_600;
const DAY: number = 86_400;

/**
 * Transforms a time in milliseconds into a readable string.
 * @param ms    -- time in milliseconds
 * @returns     -- return '0 ms' or '0 s'
 */
export const formatTime = (ms: number): string => {
    // const v = (typeof s === "string") ? Number(s) : s;
    // if (!v) return;
    // if (v >= DAY) return Math.ceil(v / DAY).toFixed(0) + " day";
    // else if (v >= HOUR) return Math.ceil(v / HOUR).toFixed(0) + " hours";
    // else if (v >= MINUTE) return Math.ceil(v / MINUTE).toFixed(0) + " minutes";
    // else if (v >= MINUTE / 12) return Math.ceil(v).toFixed(2);
    // return v.toFixed(2);
    if (ms > 3_600_000) return Math.round(ms / 60_000).toFixed(3) + " h";
    if (ms > 60_000) return Math.round(ms / 60_000).toFixed(3) + " m";
    if (ms > 1_000) return Math.round(ms / 1_000).toFixed(3) + " s";
    return ms + " ms";
}
