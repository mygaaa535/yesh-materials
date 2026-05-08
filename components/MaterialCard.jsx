"use client";

const TAG_STYLE = {
  Тест: { background: "#eff6ff", color: "#1d4ed8" },
  Лекц: { background: "#f0fdf4", color: "#15803d" },
  Дасгал: { background: "#fff7ed", color: "#c2410c" },
  Жишиг: { background: "#fdf4ff", color: "#7e22ce" },
};

export default function MaterialCard({
  material,
  saved,
  onToggleSave,
  onView,
}) {
  const tag = TAG_STYLE[material.type] || TAG_STYLE["Тест"];

  return (
    <div
      className="min-h-[206px]"
      style={{
        background: "#fff",
        border: "1px solid #e8eaed",
        borderRadius: 12,
        padding: 16,
        position: "relative",
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)")
      }
      onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
    >
      <button
        onClick={() => onToggleSave(material.id)}
        style={{
          position: "absolute",
          top: 12,
          right: 12,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          fontSize: 11,
          color: saved ? "#c84b31" : "#ccc",
          transition: "color 0.15s",
          fontFamily: "Inter, sans-serif",
          fontWeight: 600,
        }}
      >
        {saved ? "Хадгалсан" : "Хадгалах"}
      </button>
      <div className="mb-2.5">
        <div
          style={{
            width: 44,
            height: 52,
            background: "#fff5f4",
            border: "1px solid #fdd",
            borderRadius: 8,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            paddingBottom: 6,
            marginBottom: 12,
          }}
        >
          <span
            style={{
              background: "#c84b31",
              color: "#fff",
              fontSize: 8,
              fontWeight: 700,
              padding: "2px 5px",
              borderRadius: 3,
            }}
          >
            PDF
          </span>
        </div>

        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#1a1a2a",
            marginBottom: 8,
            paddingRight: 20,
            lineHeight: 1.4,
          }}
        >
          {material.title}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: 11, color: "#6b7280" }}>
            {material.year} он
          </span>
          <span
            style={{
              fontSize: 10,
              padding: "2px 8px",
              borderRadius: 10,
              fontWeight: 500,
              ...tag,
            }}
          >
            {material.type}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          gap: 7,
          width: "90%",
          position: "absolute",
          bottom: 12,
        }}
      >
        <button
          onClick={() => onView(material)}
          style={{
            flex: 1,
            padding: "7px 0",
            borderRadius: 7,
            fontSize: 12,
            fontWeight: 500,
            border: "none",
            background: "#0f1f3d",
            color: "#fff",
            cursor: "pointer",
            fontFamily: "Inter, sans-serif",
          }}
        >
          Үзэх
        </button>
        <a
          href={material.file_url}
          download={material.title + ".pdf"}
          style={{
            padding: "7px 12px",
            borderRadius: 7,
            fontSize: 12,
            border: "1px solid #e8eaed",
            background: "#f4f5f7",
            color: "#6b7280",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          Татах
        </a>
      </div>
    </div>
  );
}
