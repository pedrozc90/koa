/* --- Settings --- */
export interface CorsSettings {
    origin?: string | undefined;
}

export interface DatabaseSettings {
    url?: string | undefined;
}

export interface HashingSettings {
    salt: number;
    pepper: string;
}

export interface Settings {
    name: string;
    version: string;
    environment: "production" | "development" | "test" | string;
    port: number;
    cors: CorsSettings;
    db: DatabaseSettings;
    hashing: HashingSettings;
}

/* --- Generic --- */
export interface Page<T> {
    page: number;
    rows: number;
    count: number;
    list: T[];
}
