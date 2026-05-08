"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { SUBJECTS, MATERIAL_TYPES } from "@/types";
import Sidebar from "@/components/Sidebar";
import MaterialCard from "@/components/MaterialCard";
import PdfViewer from "@/components/PdfViewer";

export default function Home() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState("all");
  const [type, setType] = useState("all");
  const [search, setSearch] = useState("");
  const [saved, setSaved] = useState([]);
  const [viewing, setViewing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("materials")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setMaterials(data || []);
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const s = JSON.parse(localStorage.getItem("eesh_saved") || "[]");
    setSaved(s);
  }, []);

  const toggleSave = (id) => {
    const next = saved.includes(id)
      ? saved.filter((x) => x !== id)
      : [...saved, id];
    setSaved(next);
    localStorage.setItem("eesh_saved", JSON.stringify(next));
  };

  const filtered = materials.filter((m) => {
    if (subject === "saved" && !saved.includes(m.id)) return false;
    if (subject !== "all" && subject !== "saved" && m.subject !== subject)
      return false;
    if (type !== "all" && m.type !== type) return false;
    if (search) {
      const q = search.toLowerCase();
      if (!m.title.toLowerCase().includes(q) && !String(m.year).includes(q))
        return false;
    }
    return true;
  });

  const counts = { all: materials.length, saved: saved.length };
  Object.keys(SUBJECTS).forEach((s) => {
    counts[s] = materials.filter((m) => m.subject === s).length;
  });

  const subjectName =
    subject === "all"
      ? "Бүх материал"
      : subject === "saved"
        ? "Хадгалсан"
        : SUBJECTS[subject]?.name || "";

  return (
    <div
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#f4f5f7",
        minHeight: "100vh",
      }}
    >
      {viewing && (
        <PdfViewer
          url={viewing.file_url}
          title={viewing.title}
          onClose={() => setViewing(null)}
        />
      )}

      <div
        style={{
          background: "#0f1f3d",
          height: 54,
          display: "flex",
          alignItems: "center",
          padding: "0 20px",
          gap: 16,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            width: 220,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "linear-gradient(135deg,#c84b31,#e8603c)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              fontWeight: 700,
              color: "#fff",
            }}
          >
            M
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
              ЭЕШ материалууд
            </div>
          </div>
        </div>

        <div style={{ flex: 1, maxWidth: 500 }}>
          <input
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: 8,
              padding: "8px 14px",
              color: "#fff",
              fontSize: 13,
              outline: "none",
              fontFamily: "Inter, sans-serif",
            }}
            placeholder="Хайх... (жишээ: математик 2023)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div
          style={{
            marginLeft: "auto",
            fontSize: 11,
            color: "#8a9ab8",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 6,
            padding: "4px 10px",
          }}
        >
          Эх сурвалж:{" "}
          <a
            href="http://ebook.eec.mn"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#c8d8f0" }}
          >
            ebook.eec.mn
          </a>
        </div>
      </div>

      <div style={{ display: "flex", paddingTop: 54 }}>
        <Sidebar current={subject} onSelect={setSubject} counts={counts} />

        <div style={{ marginLeft: 220, flex: 1, padding: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <h1 style={{ fontSize: 22, fontWeight: 600, color: "#1a1a2a" }}>
              {subjectName}
            </h1>
            <p style={{ fontSize: 13, color: "#6b7280", marginTop: 4 }}>
              Нийт {filtered.length} материал
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 20,
              flexWrap: "wrap",
            }}
          >
            {["all", ...MATERIAL_TYPES].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "Inter, sans-serif",
                  border: "1px solid",
                  transition: "all 0.15s",
                  background: type === t ? "#0f1f3d" : "#fff",
                  color: type === t ? "#fff" : "#6b7280",
                  borderColor: type === t ? "#0f1f3d" : "#e8eaed",
                }}
              >
                {t === "all" ? "Бүгд" : t}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
              Ачааллаж байна...
            </div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: 60, color: "#6b7280" }}>
              <h3 style={{ fontSize: 16, color: "#1a1a2a", marginBottom: 6 }}>
                Материал олдсонгүй
              </h3>
              <p>Өөр түлхүүр үгээр хайж үзнэ үү</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: 14,
              }}
            >
              {filtered.map((m) => (
                <MaterialCard
                  key={m.id}
                  material={m}
                  saved={saved.includes(m.id)}
                  onToggleSave={toggleSave}
                  onView={setViewing}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
