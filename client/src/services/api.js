const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchAssignments() {
    const res = await fetch(`${API_BASE}/assignments`);
    if (!res.ok) throw new Error("Failed to fetch assignments");
    return res.json();
}

export async function fetchAssignment(id) {
    const res = await fetch(`${API_BASE}/assignments/${id}`);
    if (!res.ok) throw new Error("Failed to fetch assignment");
    return res.json();
}

export async function executeQuery(sql) {
    const res = await fetch(`${API_BASE}/execute`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Query execution failed");
    return data;
}

export async function getHint(assignmentId, currentQuery) {
    const res = await fetch(`${API_BASE}/hint`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, currentQuery }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to get hint");
    return data.hint;
}
