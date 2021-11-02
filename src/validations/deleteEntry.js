import { searchEntry } from "../db/queries/entries.js";
import generateErrorMessage from "../factories/errorMessageFactory.js";

async function validateEntryDeletion(id, user) {
    let validation = { isInvalid: false };

    try {
        const entryData = await searchEntry(id);

        if (entryData.rowCount === 0) {
            validation = generateErrorMessage(404, "Entry not found");

            return validation;
        }

        if (entryData.rows[0].userId !== user.userId) {
            validation = generateErrorMessage(
                401,
                "Entry doesn't belong to user"
            );

            return validation;
        }

        return validation;
    } catch (error) {
        validation = generateErrorMessage(500, "unknown error");

        return validation;
    }
}

export { validateEntryDeletion };
