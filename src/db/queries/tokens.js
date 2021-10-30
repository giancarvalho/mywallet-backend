import { pool } from "../pool.js";

async function findToken(id) {
    const result = await pool.query(
        `SELECT token FROM tokens WHERE "userId" = $1;`,
        [id]
    );

    return result;
}

async function createToken(id, token) {
    await pool.query(`INSERT INTO tokens ("userId", token) VALUES ($1, $2)`, [
        id,
        token,
    ]);
}

export { findToken, createToken };
