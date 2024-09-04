import pg from "../../databases/postgres";

export default async function createTableUsers() {
    await pg.query(`
    CREATE TABLE if not exists "User" (
    "idUsuario" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
    "nomeUsuario" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "peso" double precision,
    "altura" double precision,
    "genero" text NOT NULL DEFAULT 'Outros',
    "meta" text,
    "TMB" double precision
);`);

}


