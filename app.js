import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
const PORT = 4000;

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT);
