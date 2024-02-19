import path from "path";
import BaseService from "./base.service";
import { FileStorage } from "../entities";
import multer from "@koa/multer";

export function isMulterFile(value: any): value is multer.File {
    return ("originalname" in value)
        && ("mimetype" in value)
        && ("buffer" in value)
        && ("size" in value);
}

export default class FileStorageService extends BaseService<FileStorage> {

    private static _instance: FileStorageService;

    constructor() {
        super(FileStorage);
    }

    public static get instance(): FileStorageService {
        if (!this._instance) {
            this._instance = new FileStorageService();
        }
        return this._instance;
    }

    public create(file: multer.File, content: Buffer): FileStorage;
    public create(filename: string, content: Buffer, content_type: string, size?: number): FileStorage;
    public create(arg1: multer.File | string, content: Buffer, content_type?: string, size: number = 0): FileStorage {
        // const isFile = isMulterFile(arg1);
        return this._create(
            (typeof arg1 === "string") ? arg1 : arg1.originalname,
            content,
            (typeof arg1 === "string") ? content_type : arg1.mimetype,
            (typeof arg1 === "string") ? size : arg1.size
        );
    }

    private _create(filename: string, content: Buffer, content_type?: string, size?: number): FileStorage {
        const fs = new FileStorage();
        fs.filename = filename;
        fs.extension = path.extname(filename).substring(1);
        fs.content = content;
        fs.content_type = content_type || "text/plain";
        fs.size = size || content.length;
        return this.repo.create(fs);
    }

    public async getWithContent(id: number): Promise<FileStorage | null> {
        return this.repo.createQueryBuilder("fs")
            .where("fs.id = :id", { id })
            .addSelect("fs.content")
            .getOne();
    }

}

export const fileStorageService = FileStorageService.instance;
