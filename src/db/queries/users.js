import { pool } from "../pool";
import bcrypt from "bcrypt";

async function createUser(user) {
    const id = (
        await pool.query(
            "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING id;",
            [user.name, user.email]
        )
    ).rows[0].id;
    console.log(user);

    await pool.query(
        `INSERT INTO passwords ("userId", password) VALUES ($1, $2)`,
        [id, bcrypt.hashSync(user.password, 10)]
    );

    return id;
}

async function deleteUser(id) {
    await pool.query(`DELETE FROM users WHERE id = $1;`, [id]);

    await pool.query(`DELETE FROM passwords WHERE "userId" = $1;`, [id]);
    pool.end();
}

export { createUser, deleteUser };
