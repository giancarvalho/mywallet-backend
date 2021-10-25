import supertest from "supertest";
import app from "../src/app";

describe("GET /sign-in", () => {
    it("should return 401 if email or password is missing", async () => {
        const body = { email: "testonaldo@example.com", password: 123456 };

        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(401);
    });
});
