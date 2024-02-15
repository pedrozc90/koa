export interface IFileStorage {
    path: string;
    hash: string;
    filename: string;
    extension: string;
    content_type: string;
    encoding: string;
    content: Buffer;
    size: number;
}
