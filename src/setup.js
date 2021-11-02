import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "dev" ? ".env.dev" : undefined;

dotenv.config({
    path: envFile,
});
