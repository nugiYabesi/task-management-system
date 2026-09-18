// db.js
// Connects to a local PostgreSQL database using credentials from .env
// (the same database/credentials you can see and manage in pgAdmin).

require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "task_manager",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "",
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error", err);
});

module.exports = pool;
