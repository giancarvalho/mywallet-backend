import supertest from "supertest";
import app from "../src/app";
import { pool } from "../src/db/pool.js";
import { deleteUser } from "../src/db/queries/users";
import generateUserData from "../src/factories/userFactory";

describe("POST /sign-up", () => {
    let testUserName;
    afterAll(async () => {
        const result = await pool.query(
            "SELECT id FROM users WHERE name = $1",
            [testUserName]
        );

        await deleteUser(result.rows[0].id);
        pool.end();
    });

    it("Should return a 400 status if body is invalid", async () => {
        const body = {};

        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(400);
    });

    it("should return status 201 if body is valid", async () => {
        const body = generateUserData();
        testUserName = body.name;
        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(201);
    });
});
