// Seed script — inserts sample assignments into MongoDB.


require("dotenv").config({ path: __dirname + "/../server/.env" });
const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        difficulty: { type: String, enum: ["easy", "medium", "hard"] },
        sampleSchema: String,
        sampleData: String,
        expectedOutput: String,
        hints: [String],
        sandboxTable: String,
    },
    { timestamps: true }
);

const Assignment = mongoose.model("Assignment", assignmentSchema);

const assignments = [
    {
        title: "Select All Students",
        description:
            "Write a query to retrieve all columns and all rows from the students table.",
        difficulty: "easy",
        sampleSchema:
            "students(id INT, name VARCHAR, age INT, score INT)",
        sampleData:
            "Alice (21, 95), Bob (22, 72), Charlie (20, 88), Diana (23, 65), ...",
        expectedOutput: "All 10 rows from the students table.",
        hints: [
            "Think about which keyword retrieves everything.",
            "The wildcard symbol * is useful here.",
        ],
        sandboxTable: "students",
    },
    {
        title: "Students Scoring Above 80",
        description:
            "Write a query to find the names and scores of students who scored more than 80.",
        difficulty: "easy",
        sampleSchema:
            "students(id INT, name VARCHAR, age INT, score INT)",
        sampleData:
            "Alice (95), Bob (72), Charlie (88), Eve (91), Hank (82), Jack (94)",
        expectedOutput: "Alice 95, Charlie 88, Eve 91, Hank 82, Jack 94",
        hints: [
            "You need to filter rows based on a condition.",
            "Which clause lets you specify conditions?",
        ],
        sandboxTable: "students",
    },
    {
        title: "Count Students Per Age",
        description:
            "Write a query to count how many students there are for each age value. Show the age and the count.",
        difficulty: "medium",
        sampleSchema:
            "students(id INT, name VARCHAR, age INT, score INT)",
        sampleData:
            "Ages: 20 (Charlie, Hank), 21 (Alice, Eve, Jack), 22 (Bob, Grace), 23 (Diana, Ivy), 24 (Frank)",
        expectedOutput: "20→2, 21→3, 22→2, 23→2, 24→1",
        hints: [
            "You need to group rows that share the same value.",
            "Look into GROUP BY and an aggregate function.",
        ],
        sandboxTable: "students",
    },
    {
        title: "Students Enrolled in Web Development",
        description:
            "Write a query to find the names of all students enrolled in the 'Web Development' course.",
        difficulty: "medium",
        sampleSchema:
            "students(id, name, age, score)\ncourses(id, course_name, instructor)\nenrollments(id, student_id, course_id, grade)",
        sampleData:
            "Enrolled in Web Dev: Alice, Charlie, Eve, Grace, Ivy, Jack",
        expectedOutput: "Alice, Charlie, Eve, Grace, Ivy, Jack",
        hints: [
            "You need data from multiple tables.",
            "Think about how the enrollments table connects students to courses.",
            "You'll need to combine (JOIN) tables on their shared columns.",
        ],
        sandboxTable: "enrollments",
    },
    {
        title: "Average Score by Course",
        description:
            "Write a query to find the average student score for each course. Show the course name and the average score.",
        difficulty: "hard",
        sampleSchema:
            "students(id, name, age, score)\ncourses(id, course_name, instructor)\nenrollments(id, student_id, course_id, grade)",
        sampleData: "Courses: Database Systems, Web Development, Data Structures, Machine Learning",
        expectedOutput: "Average scores per course",
        hints: [
            "You need to join three tables together.",
            "Think about which aggregate function computes averages.",
            "Don't forget to group by the course.",
        ],
        sandboxTable: "enrollments",
    },
    {
        title: "Top 3 Highest Scoring Students",
        description:
            "Write a query to find the top 3 students with the highest scores. Show their name and score, ordered from highest to lowest.",
        difficulty: "easy",
        sampleSchema:
            "students(id INT, name VARCHAR, age INT, score INT)",
        sampleData: "Alice (95), Jack (94), Eve (91), Charlie (88), ...",
        expectedOutput: "Alice 95, Jack 94, Eve 91",
        hints: [
            "How do you sort results? Think about ORDER BY.",
            "How do you limit the number of results?",
        ],
        sandboxTable: "students",
    },
];

async function seed() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        await Assignment.deleteMany({});
        console.log("Cleared existing assignments");

        await Assignment.insertMany(assignments);
        console.log(`Inserted ${assignments.length} assignments`);

        await mongoose.disconnect();
        console.log("Done!");
    } catch (err) {
        console.error("Seed error:", err.message);
        process.exit(1);
    }
}

seed();
