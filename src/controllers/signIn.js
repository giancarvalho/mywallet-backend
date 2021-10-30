import bcrypt from "bcrypt";
import { v4 as tokenGenerator } from "uuid";
import { getTokenData, createToken } from "../db/queries/tokens.js";
import { findUser } from "../db/queries/users.js";

async function signIn(req, res) {
    const userData = req.body;

    try {
        if (!userData.email || !userData.password) {
            return res.sendStatus(400);
        }

        const userSearch = await findUser(userData.email);

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

        const tokenSearch = await getTokenData(user.id);

        let userToken;

        if (tokenSearch.rowCount > 0) {
            userToken = tokenSearch.rows[0].token;
        } else {
            userToken = tokenGenerator();

            await createToken(user.id, userToken);
        }

        res.send({ name: user.name, token: userToken });
    } catch (error) {
        res.sendStatus(500);
    }
}

export { signIn };
