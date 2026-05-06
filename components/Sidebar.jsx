"use client";
import { SUBJECTS } from "@/types";

export default function Sidebar({ current, onSelect, counts }) {
  const navItem = (key, label) => (
    <button
      key={key}
      onClick={() => onSelect(key)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "8px 12px",
        margin: "1px 8px",
        borderRadius: 8,
        cursor: "pointer",
        border: "none",
        width: "calc(100% - 16px)",
        textAlign: "left",
        background: current === key ? "rgba(200,75,49,0.15)" : "transparent",
        color: current === key ? "#f0d0c8" : "#8a9ab8",
        fontSize: 13,
        transition: "all 0.15s",
      }}
    >
      <span style={{ flex: 1 }}>{label}</span>
      <span
        style={{
          fontSize: 10,
          padding: "1px 7px",
          borderRadius: 10,
          background:
            current === key ? "rgba(200,75,49,0.2)" : "rgba(255,255,255,0.07)",
          color: current === key ? "#d09080" : "#5a6a8a",
        }}
      >
        {counts[key] || 0}
      </span>
    </button>
  );

  const sectionLabel = (text) => (
    <div
      style={{
        fontSize: 9,
        fontWeight: 600,
        color: "#3a4a6a",
        letterSpacing: "0.8px",
        textTransform: "uppercase",
        padding: "10px 16px 4px",
      }}
    >
      {text}
    </div>
  );

  return (
    <div
      style={{
        width: 220,
        background: "#0f1f3d",
        position: "fixed",
        top: 54,
        left: 0,
        bottom: 0,
        display: "flex",
        flexDirection: "column",
        borderRight: "1px solid rgba(255,255,255,0.05)",
        overflowY: "auto",
      }}
    >
      <div style={{ padding: "12px 0", flex: 1 }}>
        {sectionLabel("Үндсэн")}
        {navItem("all", "Бүх материал")}

        {sectionLabel("Хичээлүүд")}
        {Object.entries(SUBJECTS).map(([key, val]) => navItem(key, val.name))}

        {sectionLabel("Миний")}
        {navItem("saved", "Хадгалсан")}
      </div>

      <div
        style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div
          style={{
            background: "rgba(200,75,49,0.08)",
            border: "1px solid rgba(200,75,49,0.15)",
            borderRadius: 8,
            padding: "10px 12px",
          }}
        >
          <p style={{ fontSize: 10, color: "#8a7a78", lineHeight: 1.6 }}>
            Эх сурвалж:{" "}
            <a
              href="http://ebook.eec.mn"
              target="_blank"
              style={{ color: "#d09080" }}
            >
              ebook.eec.mn
            </a>{" "}
            (БҮТ)
          </p>
        </div>
      </div>
    </div>
  );
}
