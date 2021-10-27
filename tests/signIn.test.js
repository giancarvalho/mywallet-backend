import supertest from "supertest";
import { pool } from "../db/pool";
import app from "../src/app";
import bcrypt from "bcrypt";

describe("GET /sign-in", () => {
    let id;
    beforeAll(async () => {
        try {
            id = (
                await pool.query(
                    "INSERT INTO users (name, email) VALUES ('teste', 'test@test.com') RETURNING id;"
                )
            ).rows[0].id;

            await pool.query(
                `INSERT INTO passwords ("userId", password) VALUES ($1, $2)`,
                [id, bcrypt.hashSync("123456", 10)]
            );
        } catch (error) {
            console.log(error);
        }
    });

    afterAll(async () => {
        await pool.query(`DELETE FROM users WHERE id = $1;`, [id]);

        await pool.query(`DELETE FROM passwords WHERE "userId" = $1;`, [id]);
        pool.end();
    });

    it("should return 400 if email or password is missing", async () => {
        const body = { email: "testonaldo@example.com" };
        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(400);
    });

    it("should return 404 if credentials are not found", async () => {
        const body = {
            email: "ThisUserDoesntExist@fail.com",
            password: 123456,
        };
        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(404);
    });

    it("should get an object properties token and name if credentials are valid", async () => {
        const body = {
            email: "test@test.com",
            password: "123456",
        };
        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.body).toHaveProperty("name");
        expect(result.body).toHaveProperty("token");
    });
});
