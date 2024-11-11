import { Pool } from "pg";

if (!process.env.DB_USER || !process.env.DB_PASSWORD || !process.env.DB_NAME) {
  console.log(`Database credentials not provided: ${process.env.DB_USER}`);
  throw new Error("Database credentials not provided");
}

console.log("Attempting to connect with env:", {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

export const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT || "5432"),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const query = async (
  text: string,
  params?: (string | number | boolean | undefined)[]
) => {
  const client = await pool.connect();

  try {
    const res = await client.query(text, params);
    return res;
  } finally {
    client.release();
  }
};
