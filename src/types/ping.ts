export interface IPing {
    env: string;
    time_zone: string;
    timestamp: Date;
    local_timestamp: string;
    app: {
        name: string;
        version: string;
    }
}
