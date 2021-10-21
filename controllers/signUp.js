import { pool } from "../db/pool.js";
import { validateNewUser } from "../validations/newUser.js";
import bcrypt from "bcrypt";

async function signUp(req, res) {
    const userData = req.body;
    const validation = await validateNewUser(userData);

    try {
        console.log(validation);

        if (validation.isInvalid) {
            throw validation.errorCode;
        }

        const result = await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;",
            [userData.name, userData.email]
        );

        const hash = bcrypt.hashSync(userData.password, 10);

        await pool.query(
            `INSERT INTO passwords ("userId", password) VALUES ($1, $2);`,
            [result.rows[0].id, hash]
        );

        return res.sendStatus(201);
    } catch (error) {
        if (validation.isInvalid) {
            return res.status(error).send(validation.errorMessage);
        }

        console.log(error);

        return res.sendStatus(500);
    }
}

export { signUp };
