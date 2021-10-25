import supertest from "supertest";
import app from "../src/app";

describe("GET /sign-in", () => {
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

    it("should get an object with user name and token if credentials are valid", async () => {
        const body = {
            email: "testonaldo@example.com",
            password: "asdfgh",
        };
        const result = await supertest(app).post("/sign-in").send(body);
        const testUser = {
            name: "Testonaldo",
            token: "1765c602-20c3-4081-8ca4-d5a19ba94f93",
        };

        expect(result.body).toMatchObject(testUser);
    });
});
