import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1707307200000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS file_storage (
                id              BIGSERIAL                   PRIMARY KEY,
                
                inserted_at     TIMESTAMP WITH TIME ZONE    NOT NULL DEFAULT current_timestamp,
                updated_at      TIMESTAMP WITH TIME ZONE    NOT NULL DEFAULT current_timestamp,
                version         INTEGER                     NOT NULL DEFAULT 0,
                
                "hash"          VARCHAR(64)                 NOT NULL,
                filename        VARCHAR(255)                NOT NULL,
                extension       VARCHAR(8)                  NOT NULL,
                content         BYTEA                       NOT NULL,
                content_type    VARCHAR(64)                 NOT NULL,
                size            INTEGER                     NOT NULL DEFAULT 0
            );
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
