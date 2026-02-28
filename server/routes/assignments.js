const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

// GET /api/assignments - list all assignments
router.get("/", async (req, res) => {
    try {
        const assignments = await Assignment.find()
            .select("title description difficulty sandboxTable createdAt")
            .sort({ createdAt: -1 });

        res.json(assignments);
    } catch (err) {
        console.error("Error fetching assignments:", err.message);
        res.status(500).json({ error: "Failed to fetch assignments." });
    }
});

// GET /api/assignments/:id - get one assignment
router.get("/:id", async (req, res) => {
    try {
        const assignment = await Assignment.findById(req.params.id);

        if (!assignment) {
            return res.status(404).json({ error: "Assignment not found." });
        }

        res.json(assignment);
    } catch (err) {
        console.error("Error fetching assignment:", err.message);
        res.status(500).json({ error: "Failed to fetch assignment." });
    }
});

module.exports = router;
