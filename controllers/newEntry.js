import { pool } from "../db/pool.js";
import dayjs from "dayjs";
import { validateNewEntry } from "../validations/newEntry.js";

async function newEntry(req, res) {
    const token = req.headers.authorization.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    const entryData = req.body;
    const validation = validateNewEntry(entryData);

    try {
        if (validation.isInvalid) throw validation.errorCode;

        const userSearch = await pool.query(
            `SELECT tokens."userId" FROM tokens WHERE tokens.token = $1;`,
            [token]
        );

        let { description, amount, date, type } = entryData;

        if (!date) {
            date = dayjs().format("DD-MM-YYYY");
        }

        await pool.query(
            `INSERT INTO entries ("userId", description, amount, date, type) VALUES ($1, $2, $3, $4, $5);`,
            [userSearch.rows[0].userId, description, amount * 100, date, type]
        );

        res.sendStatus(201);
    } catch (error) {
        if (validation.isInvalid)
            return res.status(error).send(validation.errorMessage);

        console.log(error);
        res.sendStatus(500);
    }
}

export { newEntry };
