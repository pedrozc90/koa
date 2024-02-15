export interface ILoggerConfig {
    level: string;
    time_zone: string;
}

export interface IConfig {
    name: string;
    version: string;
    env: string | "production" | "development" | "test";
    port: number;
    storage: string;
    logger: ILoggerConfig;
}
