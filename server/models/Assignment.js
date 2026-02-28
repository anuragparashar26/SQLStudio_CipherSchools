const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        difficulty: {
            type: String,
            enum: ["easy", "medium", "hard"],
            default: "easy",
        },
        sampleSchema: {
            type: String,
            required: true,
        },
        sampleData: {
            type: String,
            default: "",
        },
        expectedOutput: {
            type: String,
            default: "",
        },
        hints: {
            type: [String],
            default: [],
        },
        sandboxTable: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Assignment", assignmentSchema);
