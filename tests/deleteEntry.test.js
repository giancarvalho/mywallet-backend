import app from "../src/app.js";
import supertest from "supertest";
import generateUserData from "../src/factories/userFactory";
import { createUser, deleteUser } from "../src/db/queries/users";
import { createEntry, delEntry } from "../src/db/queries/entries";
import generateEntryData from "../src/factories/entryFactory";
import { createToken, deleteToken } from "../src/db/queries/tokens";
import generateFakeToken from "../src/factories/fakeTokenFactory";
import { pool } from "../src/db/pool.js";

describe("DELETE /entries", () => {
    let user;
    let userId;
    let entryId;
    let token = generateFakeToken();

    beforeAll(async () => {
        const entry = generateEntryData();
        user = generateUserData();
        userId = await createUser(user);
        entryId = await createEntry(userId, entry);

        await createToken(userId, token);
    });

    afterAll(async () => {
        await deleteUser(userId);
        await delEntry(entryId);
        await deleteToken(token);
        pool.end();
    });

    it("should return 404 if entry doesnt exist", async () => {
        const result = await supertest(app)
            .delete("/entries?id=100000")
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(404);
    });

    it("should return 200 if entry does exist", async () => {
        const result = await supertest(app)
            .delete(`/entries?id=${entryId}`)
            .set("Authorization", `Bearer ${token}`);

        expect(result.status).toEqual(200);
    });
});
