import bcrypt from "bcrypt";
import { v4 as tokenGenerator } from "uuid";
import { pool } from "../db/pool.js";

async function signIn(req, res) {
    const userData = req.body;

    try {
        if (!userData.email || !userData.password) {
            return res.sendStatus(400);
        }

        const userSearch = await pool.query(
            `SELECT users.id, passwords.password FROM users JOIN passwords ON users.id=passwords."userId" WHERE email = $1;
`,
            [userData.email]
        );

        if (userSearch.rowCount === 0) {
            return res.sendStatus(404);
        }

        const user = userSearch.rows[0];

        const correctPassword = bcrypt.compareSync(
            userData.password,
            user.password
        );

        if (!correctPassword) {
            return res.status(400).send("Wrong password");
        }

        const tokenSearch = await pool.query(
            `SELECT token FROM tokens WHERE "userId" = $1;`,
            [user.id]
        );

        let userToken;

        if (tokenSearch.rowCount > 0) {
            userToken = tokenSearch.rows[0].token;
        } else {
            userToken = tokenGenerator();
            await pool.query(
                `INSERT INTO tokens ("userId", token) VALUES ($1, $2)`,
                [user.id, userToken]
            );
        }

        res.send(userToken);
    } catch (error) {
        res.sendStatus(500);
    }
}

export { signIn };
