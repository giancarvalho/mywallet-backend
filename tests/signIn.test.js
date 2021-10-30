import supertest from "supertest";
import app from "../src/app";
import generateUserData from "../src/factories/userFactory";
import { createUser, deleteUser } from "../src/db/queries/users";

describe("GET /sign-in", () => {
    let id;
    let user;
    beforeAll(async () => {
        user = generateUserData();
        id = await createUser(user);
    });

    afterAll(async () => {
        await deleteUser(id);
    });

    it("should return 400 if email or password is missing", async () => {
        const body = { email: user.email };
        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(400);
    });

    it("should return 404 if credentials are not found", async () => {
        const body = generateUserData();
        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(404);
    });

    it("should get an object with properties token and name if credentials are valid", async () => {
        const result = await supertest(app).post("/sign-in").send(user);

        expect(result.body).toHaveProperty("name");
        expect(result.body).toHaveProperty("token");
    });
});
