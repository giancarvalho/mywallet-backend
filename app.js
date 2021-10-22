import express from "express";
import cors from "cors";
import { pool } from "./db/pool.js";
import { signUp } from "./controllers/signUp.js";
import { signIn } from "./controllers/signIn.js";
import { newEntry } from "./controllers/newEntry.js";

const PORT = 4000;
const app = express();
app.use(cors());
app.use(express.json());

app.get("/entries", async (req, res) => {
    try {
        const results = await pool.query("SELECT * FROM entries;");

        res.send(results.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
});

app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.post("/entries", newEntry);

app.listen(PORT);
