// LLM Service — calls Google Gemini API to generate hints.


const SYSTEM_PROMPT = `You are a SQL teaching assistant. A student is working on a SQL assignment.

RULES:
- Give a SHORT hint (1-3 sentences max)
- NEVER write a complete SQL query
- NEVER include SELECT, FROM, WHERE, JOIN, GROUP BY etc. in a code block
- Instead, describe the CONCEPT they should think about
- If they are close, tell them WHAT part to look at
- If they are stuck, suggest which SQL clause or keyword to research
- Be encouraging and friendly`;

async function getHint(assignmentDescription, sampleSchema, studentQuery) {
    const apiKey = process.env.GEMINI_API_KEY;
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not configured in .env");
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const userMessage = `ASSIGNMENT: ${assignmentDescription}
TABLE SCHEMA: ${sampleSchema}
STUDENT'S CURRENT QUERY: ${studentQuery || "(empty — student hasn't written anything yet)"}

Give a helpful hint.`;

    const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            systemInstruction: {
                parts: [{ text: SYSTEM_PROMPT }]
            },
            contents: [{
                role: "user",
                parts: [{ text: userMessage }]
            }],
            generationConfig: {
                maxOutputTokens: 200,
                temperature: 0.7,
            }
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API error: ${response.status} — ${errorText}`);
    }

    const data = await response.json();

    try {
        return data.candidates[0].content.parts[0].text.trim();
    } catch (err) {
        console.error("Error parsing Gemini response:", data);
        throw new Error("Failed to parse AI response.");
    }
}

module.exports = { getHint };
