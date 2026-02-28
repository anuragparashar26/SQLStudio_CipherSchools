const { pgPool } = require("../config/db");

// Run a SELECT query on the PostgreSQL sandbox.
// Returns { columns, rows } on success.
async function runQuery(sql) {
    const result = await pgPool.query(sql);

    // Extract column names from the result fields
    const columns = result.fields.map((f) => f.name);
    const rows = result.rows;

    return { columns, rows };
}

module.exports = { runQuery };
