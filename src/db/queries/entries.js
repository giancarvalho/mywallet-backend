import { pool } from "../pool.js";

async function searchEntries(id) {
    const result = await pool.query(
        `SELECT entries.id, entries.description, entries.date, entries.type, cast(entries.amount / 100.0 AS decimal(10,2)) AS amount, users.name as username FROM entries JOIN users ON entries."userId"=users.id WHERE "userId" = $1;`,
        [id]
    );

    return result;
}

async function createEntry(id, entryData) {
    let { description, amount, date, type } = entryData;

    await pool.query(
        `INSERT INTO entries ("userId", description, amount, date, type) VALUES ($1, $2, $3, $4, $5);`,
        [id, description, amount * 100, date, type]
    );
}

export { searchEntries, createEntry };
