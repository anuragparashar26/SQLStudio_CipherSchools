import Editor from "@monaco-editor/react";

export default function QueryEditor({ value, onChange }) {
    return (
        <Editor
            height="100%"
            defaultLanguage="sql"
            theme="vs-dark"
            value={value}
            onChange={(val) => onChange(val || "")}
            options={{
                fontSize: 14,
                fontFamily: "'Menlo', 'Monaco', 'Consolas', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbers: "on",
                renderLineHighlight: "line",
                padding: { top: 10, bottom: 10 },
                wordWrap: "on",
                tabSize: 2,
                automaticLayout: true,
            }}
        />
    );
}
