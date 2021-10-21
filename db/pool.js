import pg from "pg";
import settings from "./settings.js";

const { Pool } = pg;

const pool = new Pool(settings);

export { pool };
