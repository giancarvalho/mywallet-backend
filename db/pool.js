import pg from "pg";
//delete line below and import your db configs
import settings from "./settings.js";

const { Pool } = pg;

const pool = new Pool(settings);

export { pool };
