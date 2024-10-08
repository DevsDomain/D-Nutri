import pg from "../../databases/postgres";

export default async function createTableAlimentos() {
    await pg.query(`
    CREATE TABLE if not exists "Alimentos" (
    "idProduto" INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY NOT NULL,
    "barcode" text,
    "nomeProduto" text,
    "imageSrc" text,
    "Proteina" double precision,
    "Caloria" double precision,
    "Carboidrato" double precision,
    "gordura" double precision,
    "sodio" double precision,
    "acucar" double precision
);`);
}