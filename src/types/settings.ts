export interface ILoggerConfig {
    level: string;
    time_zone: string;
}

export interface ISettings {
    env: string | "production" | "development" | "test";
    development: boolean;
    test: boolean;
    name: string;
    version: string;
    port: number;
    storage: string;
    logger: ILoggerConfig;
}
