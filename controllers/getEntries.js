import { pool } from "../db/pool.js";

async function getEntries(req, res) {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const userSearch = await pool.query(
            `SELECT tokens."userId" FROM tokens WHERE tokens.token = $1;`,
            [token]
        );

        const results = await pool.query(
            `SELECT description, date, type, cast(amount / 100.0 AS decimal(10,2)) AS amount FROM entries WHERE "userId" = $1;`,
            [userSearch.rows[0].userId]
        );

        res.send(results.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { getEntries };
