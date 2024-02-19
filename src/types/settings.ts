export interface ILoggerSettings {
    level: string;
    time_zone: string;
}

export interface IJWTSettings {
    secret_key: string;
    expiration: string;
}

export interface ISettings {
    env: string | "production" | "development" | "test";
    development: boolean;
    test: boolean;
    name: string;
    version: string;
    port: number;
    storage: string;
    logger: ILoggerSettings;
    jwt?: IJWTSettings;
}
