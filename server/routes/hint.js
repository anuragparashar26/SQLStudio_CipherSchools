const express = require("express");
const Assignment = require("../models/Assignment");
const { getHint } = require("../services/llm");

const router = express.Router();

// POST /api/hint - get an AI-generated hint for an assignment
router.post("/", async (req, res) => {
    const { assignmentId, currentQuery } = req.body;

    if (!assignmentId) {
        return res.status(400).json({ error: "assignmentId is required." });
    }

    try {
        // fetch assignment for context
        const assignment = await Assignment.findById(assignmentId);
        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found." });
        }

        const hint = await getHint(
            assignment.description,
            assignment.sampleSchema,
            currentQuery || ""
        );

        res.json({ hint });
    } catch (err) {
        console.error("Hint generation error:", err.message);
        res.status(500).json({ error: "Failed to generate hint. Please try again." });
    }
});

module.exports = router;
