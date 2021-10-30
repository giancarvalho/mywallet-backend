import dayjs from "dayjs";
import { validateNewEntry } from "../validations/newEntry.js";
import { getTokenData } from "../db/queries/tokens.js";
import { createEntry } from "../db/queries/entries.js";

async function newEntry(req, res) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    const entryData = req.body;
    const validation = validateNewEntry(entryData);

    try {
        if (validation.isInvalid) throw validation.errorCode;

        const userSearch = await getTokenData(token);

        if (userSearch.rowCount === 0) return res.sendStatus(401);

        let { date } = entryData;

        if (!date) {
            date = dayjs().format("DD-MM-YYYY");
            entryData.date = date;
        }

        await createEntry(userSearch.rows[0].userId, entryData);

        res.sendStatus(201);
    } catch (error) {
        if (validation.isInvalid)
            return res.status(error).send(validation.errorMessage);

        res.sendStatus(500);
    }
}

export { newEntry };
