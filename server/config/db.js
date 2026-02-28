const mongoose = require("mongoose");
const { Pool } = require("pg");

// MongoDB Connection
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (err) {
        console.error("MongoDB connection error:", err.message);
        process.exit(1);
    }
};

// PostgreSQL Pool
const pgPool = new Pool({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT, 10),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    // Safety: kill any query that runs longer than 5 seconds
    statement_timeout: 5000,
    // SSL: required by cloud providers
    ssl: process.env.PG_SSL === "true" ? { rejectUnauthorized: false } : false,
});

pgPool.on("error", (err) => {
    console.error("PostgreSQL pool error:", err.message);
});

module.exports = { connectMongo, pgPool };
