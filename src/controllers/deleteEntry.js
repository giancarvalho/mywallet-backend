import { delEntry } from "../db/queries/entries.js";
import { getTokenData } from "../db/queries/tokens.js";
import { validateEntryDeletion } from "../validations/deleteEntry.js";

export default async function deleteEntry(req, res) {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const id = req.query.id;
    if (!token) return res.sendStatus(401);
    let validation;

    try {
        const userSearch = await getTokenData(token);

        if (userSearch.rowCount === 0) return res.sendStatus(401);

        validation = await validateEntryDeletion(id, userSearch.rows[0]);

        if (validation.isInvalid) throw validation.errorCode;

        await delEntry(id);
        res.sendStatus(200);
    } catch (error) {
        if (validation.isInvalid)
            return res.status(error).send(validation.errorMessage);
        res.sendStatus(500);
    }
}
