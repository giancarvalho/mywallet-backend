import express from "express";
import cors from "cors";
import { signUp } from "./controllers/signUp.js";
import { signIn } from "./controllers/signIn.js";
import { newEntry } from "./controllers/newEntry.js";
import { getEntries } from "./controllers/getEntries.js";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/sign-up", signUp);

app.post("/sign-in", signIn);

app.get("/entries", getEntries);

app.post("/entries", newEntry);

export default app;
