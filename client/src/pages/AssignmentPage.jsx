import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAssignment, executeQuery, getHint } from "../services/api";
import QueryEditor from "../components/QueryEditor";

export default function AssignmentPage() {
    const { id } = useParams();
    const [assignment, setAssignment] = useState(null);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState(null);
    const [error, setError] = useState(null);
    const [hint, setHint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [executing, setExecuting] = useState(false);
    const [hintLoading, setHintLoading] = useState(false);

    useEffect(() => {
        fetchAssignment(id)
            .then(setAssignment)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    const handleExecute = async () => {
        setExecuting(true);
        setError(null);
        setResults(null);
        try {
            const data = await executeQuery(query);
            setResults(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setExecuting(false);
        }
    };

    const handleGetHint = async () => {
        setHintLoading(true);
        try {
            const hintText = await getHint(id, query);
            setHint(hintText);
        } catch {
            setHint("Could not generate a hint right now.");
        } finally {
            setHintLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="loading-page">
                <span className="spinner"></span> Loading...
            </div>
        );
    }

    if (!assignment) {
        return (
            <div style={{ padding: "2rem" }}>
                <div className="error-msg">Assignment not found.</div>
                <Link to="/" className="btn btn--ghost" style={{ marginTop: "1rem" }}>
                    ← Back
                </Link>
            </div>
        );
    }

    return (
        <div className="workspace">
            {/* Left: Description */}
            <div className="desc-panel">
                <Link to="/" className="desc-panel__back">← Back</Link>

                <div className="desc-panel__title">
                    {assignment.title}
                    <span className={`diff diff--${assignment.difficulty}`}>
                        {assignment.difficulty}
                    </span>
                </div>

                <p className="desc-panel__text">{assignment.description}</p>

                <div className="schema-block">
                    <div className="schema-block__label">Table Schema</div>
                    <pre>{assignment.sampleSchema}</pre>
                </div>

                {assignment.sampleData && (
                    <div className="schema-block">
                        <div className="schema-block__label">Sample Data</div>
                        <pre>{assignment.sampleData}</pre>
                    </div>
                )}
            </div>

            {/* Right: Editor + Output */}
            <div className="editor-panel">
                {/* Toolbar */}
                <div className="editor-toolbar">
                    <span className="toolbar-label">SQL Editor</span>
                    <button
                        className="btn btn--run"
                        onClick={handleExecute}
                        disabled={executing || !query.trim()}
                    >
                        {executing ? <><span className="spinner"></span> Running</> : "▶ Run"}
                    </button>
                    <button
                        className="btn btn--hint"
                        onClick={handleGetHint}
                        disabled={hintLoading}
                    >
                        {hintLoading ? <><span className="spinner"></span> Thinking</> : "💡 Hint"}
                    </button>
                    <button
                        className="btn btn--ghost"
                        onClick={() => { setQuery(""); setResults(null); setError(null); setHint(null); }}
                    >
                        Clear
                    </button>
                </div>

                {/* Monaco Editor */}
                <div className="editor-wrapper">
                    <QueryEditor value={query} onChange={setQuery} />
                </div>

                {/* Output */}
                <div className="output-area">
                    <div className="output-area__header">Output</div>
                    <div className="output-area__content">
                        {/* Error */}
                        {error && <div className="error-msg">{error}</div>}

                        {/* Hint */}
                        {hint && !hintLoading && (
                            <div className="hint-box" style={{ marginBottom: error || results ? "0.75rem" : 0 }}>
                                <div className="hint-box__label">💡 Hint</div>
                                <p className="hint-box__text">{hint}</p>
                            </div>
                        )}

                        {/* Results */}
                        {results && results.rows.length === 0 && (
                            <div className="results-empty">Query executed — 0 rows returned.</div>
                        )}
                        {results && results.rows.length > 0 && (
                            <div>
                                <div style={{ color: "#9b9b9b", fontSize: "0.8rem", marginBottom: "0.5rem" }}>
                                    {results.rows.length} row{results.rows.length !== 1 ? "s" : ""}
                                </div>
                                <table className="results-table">
                                    <thead>
                                        <tr>
                                            {results.columns.map((col) => (
                                                <th key={col}>{col}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.rows.map((row, i) => (
                                            <tr key={i}>
                                                {results.columns.map((col) => (
                                                    <td key={col}>{row[col] !== null ? String(row[col]) : "NULL"}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Empty state */}
                        {!error && !hint && !results && (
                            <div className="results-empty">Run a query to see results here.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
