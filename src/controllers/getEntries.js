import { pool } from "../db/pool.js";
import { searchEntries } from "../db/queries/entries.js";
import { findToken } from "../db/queries/tokens.js";

async function getEntries(req, res) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const userSearch = await findToken(token);

        const results = await searchEntries(userSearch.rows[0].userId);

        res.send(results.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export { getEntries };
