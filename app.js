import express from "express";
import cors from "cors";
import { pool } from "./db/pool.js";
import { signUp } from "./controllers/signUp.js";

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

app.listen(PORT);
