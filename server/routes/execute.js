const express = require("express");
const { sanitizeMiddleware } = require("../middleware/sanitize");
const { runQuery } = require("../services/sandbox");

const router = express.Router();

// POST /api/execute - execute a SQL query on the sandbox
router.post("/", sanitizeMiddleware, async (req, res) => {
    const { sql } = req.body;

    try {
        const result = await runQuery(sql);
        res.json(result);
    } catch (err) {
        console.error("Query execution error:", err.message);

        const message = err.message.includes("statement timeout")
            ? "Query timed out. Please simplify your query."
            : `SQL Error: ${err.message}`;

        res.status(400).json({ error: message });
    }
});

module.exports = router;
