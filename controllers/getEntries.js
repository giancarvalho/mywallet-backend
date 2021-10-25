import { pool } from "../db/pool.js";

async function getEntries(req, res) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const userSearch = await pool.query(
            `SELECT tokens."userId" FROM tokens WHERE tokens.token = $1;`,
            [token]
        );

        const results = await pool.query(
            `SELECT entries.description, entries.date, entries.type, cast(entries.amount / 100.0 AS decimal(10,2)) AS amount, users.name as username FROM entries JOIN users ON entries."userId"=users.id WHERE "userId" = $1;`,
            [userSearch.rows[0].userId]
        );

        res.send(results.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { getEntries };
