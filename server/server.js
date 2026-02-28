require("dotenv").config();

const app = require("./app");
const { connectMongo } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function start() {
    await connectMongo();

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });
}

start();
