import { Pool } from 'pg'
import dotenv from 'dotenv'
require('dotenv').config({ path: __dirname + '/../../../../.env' });
const user = process.env.PG_USER
const password = process.env.PG_PASS 
const db = process.env.PG_DB 
const myHost = process.env.HOST 

const pg =
    new Pool({
        user: user,
        password: password,
        host: myHost,
        port: 5432,
        database: db,
        max: 20, // Max de conexões abertas
        idleTimeoutMillis: 30000, // Encerra conexões abertas por mais de 30s
        connectionTimeoutMillis: 5000, // Retorna erro caso não consiga se conectar em 5s
    })

async function connectToPostgres() {
    try {
        await pg.connect();
        console.log("Postgres conectado com sucesso!");
    } catch (error: any) {
        console.error("Erro ao conectar no postgres:", error.message);

    }
}

connectToPostgres();


export default pg;
