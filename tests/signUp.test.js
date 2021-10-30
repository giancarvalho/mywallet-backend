import supertest from "supertest";
import app from "../src/app";

import { createUser, deleteUser } from "../src/db/queries/users";
import faker from "faker";

describe("POST /sign-up", () => {
    it("Should return a 400 status if body is invalid", async () => {
        const body = {};

        const result = await supertest(app).post("/sign-up").send(body);

        expect(result.status).toEqual(400);
    });

    // it("should return status 201 if body is valid", async () => {
    //     c;
    // });
});
