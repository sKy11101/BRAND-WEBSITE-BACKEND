import "dotenv/config";
import pg from "pg";
import fs from "node:fs";

const { Pool } = pg;

const pool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,

    ssl: {
        ca: fs.readFileSync(
            process.env.DB_SSL_CA,
            "utf8"
        ),
        rejectUnauthorized: true
    },

    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
});

pool.on("error", (error) => {
    console.error("PostgreSQL pool error:", error.code);
});

export default pool;
