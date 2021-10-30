import { pool } from "../pool.js";

async function searchEntries(id) {
    const result = await pool.query(
        `SELECT entries.id, entries.description, entries.date, entries.type, cast(entries.amount / 100.0 AS decimal(10,2)) AS amount, users.name as username FROM entries JOIN users ON entries."userId"=users.id WHERE "userId" = $1;`,
        [id]
    );

    return result;
}

export { searchEntries };
