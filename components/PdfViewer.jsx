"use client";

export default function PdfViewer({ url, title, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(0,0,0,0.7)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: "#0f1f3d",
          padding: "0 20px",
          height: 52,
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexShrink: 0,
        }}
      >
        <span style={{ color: "#fff", fontSize: 14, fontWeight: 500, flex: 1 }}>
          {title}
        </span>

        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.1)",
            border: "none",
            color: "#fff",
            borderRadius: 7,
            padding: "6px 14px",
            cursor: "pointer",
            fontSize: 12,
            fontFamily: "Inter, sans-serif",
          }}
        >
          Хаах
        </button>
      </div>

      <iframe
        src={url}
        style={{ flex: 1, border: "none", background: "#525659" }}
        title={title}
      />
    </div>
  );
}
