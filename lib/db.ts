import { Pool } from "pg";

if (
  !process.env.POSTGRES_USER ||
  !process.env.POSTGRES_PASSWORD ||
  !process.env.POSTGRES_DB
) {
  throw new Error("Database credentials not provided");
}

export const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
