import { pool } from "../pool.js";
import bcrypt from "bcrypt";

async function createUser(user) {
    const id = (
        await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;",
            [user.name, user.email]
        )
    ).rows[0].id;

    const userHash = bcrypt.hashSync(user.password, 10);
    await pool.query(
        `INSERT INTO passwords ("userId", password) VALUES ($1, $2)`,
        [id, userHash]
    );

    return id;
}

async function deleteUser(id) {
    await pool.query(`DELETE FROM users WHERE id = $1;`, [id]);

    await pool.query(`DELETE FROM passwords WHERE "userId" = $1;`, [id]);
    pool.end();
}

async function findUser(email) {
    const result = await pool.query(
        `SELECT users.id, users.name, passwords.password FROM users JOIN passwords ON users.id=passwords."userId" WHERE email = $1;
`,
        [email]
    );

    return result;
}

export { createUser, deleteUser, findUser };
