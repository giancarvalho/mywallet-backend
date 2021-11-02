import { pool } from "../pool.js";

async function getTokenData(query) {
    const filter = Number(query) ? `"userId"` : "token";

    const result = await pool.query(
        `SELECT * FROM tokens WHERE ${filter} = $1;`,
        [query]
    );

    return result;
}

async function createToken(id, token) {
    await pool.query(`INSERT INTO tokens ("userId", token) VALUES ($1, $2)`, [
        id,
        token,
    ]);
}

async function deleteToken(token) {
    await pool.query(`DELETE FROM tokens WHERE token = $1`, [token]);
}

export { getTokenData, createToken, deleteToken };
