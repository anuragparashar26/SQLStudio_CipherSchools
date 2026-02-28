import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAssignments } from "../services/api";

export default function HomePage() {
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAssignments()
            .then(setAssignments)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="loading-page">
                <span className="spinner"></span> Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: "2rem", textAlign: "center" }}>
                <div className="error-msg">{error}</div>
            </div>
        );
    }

    return (
        <div className="problem-list">
            <div className="problem-list__header">
                <h1>SQL Assignments</h1>
                <p>Pick a problem and start writing queries.</p>
            </div>

            {assignments.length === 0 ? (
                <p style={{ color: "#6b6b6b" }}>No assignments yet.</p>
            ) : (
                <table className="problem-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Difficulty</th>
                            <th>Table</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((a, i) => (
                            <tr key={a._id} onClick={() => navigate(`/assignment/${a._id}`)}>
                                <td style={{ color: "#6b6b6b" }}>{i + 1}</td>
                                <td className="col-title">{a.title}</td>
                                <td>
                                    <span className={`diff diff--${a.difficulty}`}>
                                        {a.difficulty}
                                    </span>
                                </td>
                                <td className="col-table">{a.sandboxTable}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
