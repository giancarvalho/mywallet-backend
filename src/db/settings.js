import "../setup.js";
let settings;

if (process.env.DB_USER) {
    settings = {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT),
        host: process.env.DB_HOST,
        database: process.env.DB_DATABASE,
    };
} else {
    settings = {
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        },
    };
}

export default settings;
