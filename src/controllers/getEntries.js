import { searchEntries } from "../db/queries/entries.js";
import { getTokenData } from "../db/queries/tokens.js";

async function getEntries(req, res) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);

    try {
        const userSearch = await getTokenData(token);

        console.log(userSearch);

        if (userSearch.rowCount === 0) return res.sendStatus(401);

        const results = await searchEntries(userSearch.rows[0].userId);

        res.send(results.rows);
    } catch (error) {
        res.sendStatus(500);
    }
}

export { getEntries };
