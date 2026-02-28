// SQL Sanitizer - blocks anything that isn't a safe SELECT query.

const FORBIDDEN_KEYWORDS = [
    "INSERT",
    "UPDATE",
    "DELETE",
    "DROP",
    "ALTER",
    "TRUNCATE",
    "CREATE",
    "GRANT",
    "REVOKE",
    "EXEC",
    "EXECUTE",
    "COPY",
    "PG_SLEEP",
    "PG_READ_FILE",
    "PG_WRITE_FILE",
];

function sanitizeQuery(sql) {
    // 1. Check for empty input
    if (!sql || !sql.trim()) {
        return { safe: false, reason: "Query cannot be empty." };
    }

    const trimmed = sql.trim();
    const upper = trimmed.toUpperCase();

    // 2. Must start with SELECT or WITH (for CTEs)
    if (!upper.startsWith("SELECT") && !upper.startsWith("WITH")) {
        return { safe: false, reason: "Only SELECT queries are allowed." };
    }

    // 3. Check for forbidden keywords
    for (const keyword of FORBIDDEN_KEYWORDS) {
        // Use word boundary regex so "DELETED_AT" doesn't match "DELETE"
        const regex = new RegExp(`\\b${keyword}\\b`, "i");
        if (regex.test(trimmed)) {
            return {
                safe: false,
                reason: `Forbidden keyword detected: ${keyword}. Only SELECT queries are allowed.`,
            };
        }
    }

    // 4. Block multiple statements (semicolon followed by more text)
    const parts = trimmed.split(";").filter((p) => p.trim().length > 0);
    if (parts.length > 1) {
        return {
            safe: false,
            reason: "Multiple SQL statements are not allowed.",
        };
    }

    // 5. Block SQL comments (could hide malicious queries)
    if (trimmed.includes("--") || trimmed.includes("/*")) {
        return {
            safe: false,
            reason: "SQL comments are not allowed.",
        };
    }

    return { safe: true };
}

// Express middleware version
function sanitizeMiddleware(req, res, next) {
    const { sql } = req.body;
    const result = sanitizeQuery(sql);

    if (!result.safe) {
        return res.status(400).json({ error: result.reason });
    }

    next();
}

module.exports = { sanitizeQuery, sanitizeMiddleware };
