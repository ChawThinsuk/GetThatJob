import * as pg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pg.default;

const pool = new Pool({
  connectionString: `postgresql://postgres:${process.env.DB_PASSWORD}@db.tipblwonxptinlldwrch.supabase.co:5432/postgres`,
});

export { pool };