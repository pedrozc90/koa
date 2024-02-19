CREATE SEQUENCE IF NOT EXISTS public.x_id_seq AS bigint
    INCREMENT BY 1
    START WITH 1
    MINVALUE 1
    CACHE 1;

CREATE TABLE IF NOT EXISTS x (
    id              BIGINT                      NOT NULL DEFAULT nextval('public.x_id_seq'),
    
    inserted_at     TIMESTAMP WITH TIME ZONE    NOT NULL DEFAULT current_timestamp,
    updated_at      TIMESTAMP WITH TIME ZONE    NOT NULL DEFAULT current_timestamp,
    version         INTEGER                     NOT NULL DEFAULT 0,
    
    "hash"          VARCHAR(64)                 NOT NULL,
    filename        VARCHAR(255)                NOT NULL,
    extension       VARCHAR(8)                  NOT NULL,
    content         BYTEA                       NOT NULL,
    content_type    VARCHAR(64)                 NOT NULL,
    size            INTEGER                     NOT NULL DEFAULT 0,

    CONSTRAINT x_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS y (
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
