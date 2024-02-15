-- users
CREATE TYPE "Role" AS ENUM ('NONE', 'NORMAL', 'MASTER');

CREATE TABLE "users" (
    "id"            BIGSERIAL    NOT NULL,

    "inserted_at"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at"    TIMESTAMP(3) NOT NULL,
    "version"       INTEGER      NOT NULL DEFAULT 1,

    "email"         VARCHAR(255) NOT NULL,
    "password"      VARCHAR(64)  NOT NULL,
    "role"          "Role"       NOT NULL DEFAULT 'NONE',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "users_email_ukey" UNIQUE ("email")
);

-- stored_files
CREATE TYPE "StorageFileType" AS ENUM ('local', 'bucket');

CREATE TABLE "stored_files" (
    "id"            BIGSERIAL         NOT NULL,

    "inserted_at"   TIMESTAMP(3)      NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inserted_by"   BIGINT,
    "updated_at"    TIMESTAMP(3)      NOT NULL,
    "updated_by"    BIGINT,
    "version"       INTEGER           NOT NULL DEFAULT 1,

    "storage_type"  "StorageFileType" NOT NULL DEFAULT 'local',
    "object_key"    VARCHAR(1000),
    "etag"          VARCHAR(255),
    
    "hash"          VARCHAR(64)       NOT NULL,
    "filename"      VARCHAR(255)      NOT NULL,
    "content_type"  VARCHAR(255)      NOT NULL,

    "content"       BYTEA,
    "size"          BIGINT            NOT NULL DEFAULT 0,

    CONSTRAINT "stored_files_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "stored_files_inserted_by_fkey" FOREIGN KEY ("inserted_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stored_files_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stored_files_hash_ukey" UNIQUE ("hash"),
    CONSTRAINT "stored_files_storage_chk" CHECK (
        (storage_type = 'local' AND content IS NOT NULL AND object_key IS NULL)
        OR
        (storage_type = 'bucket' AND content IS NULL AND object_key IS NOT NULL)
    )
);

CREATE INDEX IF NOT EXISTS "stored_files_object_key_idx" ON "stored_files" ("object_key");
CREATE INDEX IF NOT EXISTS "stored_files_etag_idx" ON "stored_files" ("etag");
