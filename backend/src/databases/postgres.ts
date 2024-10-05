import { Pool } from 'pg';
require('dotenv').config({ path: __dirname + '/../../../../.env' });
const password = process.env.PG_PASS || 'your_pg_password';
console.log(password)

const connectionString = `postgresql://postgres.wnvipfgsewkkjiiwsoic:${password}@aws-0-us-west-1.pooler.supabase.com:6543/postgres`
const postgresLocal = `postgresql://postgres:2202@localhost:5432/Dnutri`

// Alterar aqui para postgresLocal para rodar localmente
const pool = new Pool({
    connectionString: postgresLocal,
});

async function connectToPostgres() {
    try {
        const client = await pool.connect();
        console.log("Postgres connected successfully!");

        client.release();  // Release the client back to the pool
    } catch (error: any) {
        console.error("Error connecting to Postgres:", error.message);
    }
}

connectToPostgres();

export default pool;
