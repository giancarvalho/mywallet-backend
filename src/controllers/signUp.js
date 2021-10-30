import { validateNewUser } from "../validations/newUser.js";
import { createUser } from "../db/queries/users.js";

async function signUp(req, res) {
    const userData = req.body;
    const validation = await validateNewUser(userData);

    try {
        if (validation.isInvalid) {
            throw validation.errorCode;
        }

        await createUser(userData);

        return res.sendStatus(201);
    } catch (error) {
        if (validation.isInvalid) {
            return res.status(error).send(validation.errorMessage);
        }

        return res.sendStatus(500);
    }
}

export { signUp };
