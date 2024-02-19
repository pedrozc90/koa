import path from "path";
import multer from "@koa/multer";
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";

import { createHash } from "../utils";
import { Audit } from "./audit";

@Entity({ name: "file_storage" })
export class FileStorage {

    @PrimaryGeneratedColumn({ name: "id", type: "bigint", primaryKeyConstraintName: "file_storage_pkey" })
    public id: number | null = null;

    @Column(() => Audit, { prefix: false })
    public audit!: Audit;

    @Column({ name: "hash", type: "varchar", length: 64, nullable: false })
    public hash!: string;

    public path?: string;

    @Column({ name: "filename", type: "varchar", nullable: false })
    public filename!: string;

    @Column({ name: "extension", type: "varchar", length: 8, nullable: false })
    public extension!: string;

    @Column({ name: "content", type: "bytea", nullable: false, update: false, select: false })
    public content!: Buffer;

    @Column({ name: "content_type", type: "varchar", length: 64, nullable: false })
    public content_type!: string;

    @Column({ name: "size", nullable: false })
    public size: number = 0;

    @BeforeInsert()
    public onBeforeInsert(): void {
        if (this.content) {
            this.hash = createHash(this.content);
        }
    }

    public static create(file: multer.File): FileStorage {
        const fs = new FileStorage();
        fs.filename = file.originalname;
        fs.extension = path.extname(file.originalname).substring(1);
        fs.content_type = file.mimetype;
        fs.size = file.size;
        fs.content = file.buffer;
        return fs;
    }

}
