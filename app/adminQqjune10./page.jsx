"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { SUBJECTS, MATERIAL_TYPES } from "@/types";

export default function AdminPage() {
  const [form, setForm] = useState({
    subject: "math",
    title: "",
    type: "Тест",
    year: new Date().getFullYear(),
  });
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!form.title.trim()) return setError("Гарчиг оруулна уу");
    if (!file) return setError("PDF файл сонгоно уу");

    setError("");
    setUploading(true);
    setProgress(30);

    try {
      const fileName = `${form.subject}_${form.year}_${Date.now()}.pdf`;

      const { error: uploadError } = await supabase.storage
        .from("materials")
        .upload(fileName, file, { contentType: "application/pdf" });

      if (uploadError) throw uploadError;
      setProgress(70);

      const { data } = supabase.storage
        .from("materials")
        .getPublicUrl(fileName);

      const fileUrl = data.publicUrl;
      setProgress(90);

      const { error: dbError } = await supabase.from("materials").insert({
        subject: form.subject,
        title: form.title,
        type: form.type,
        year: Number(form.year),
        file_url: fileUrl,
        file_name: fileName,
      });

      if (dbError) throw dbError;

      setProgress(100);
      setSuccess(true);
      setFile(null);
      setProgress(0);
      setForm((f) => ({ ...f, title: "" }));
      setTimeout(() => setSuccess(false), 3000);
    } catch (e) {
      setError("Алдаа: " + e.message);
    }
    setUploading(false);
  };

  const inputStyle = {
    width: "100%",
    border: "1px solid #e8eaed",
    borderRadius: 8,
    padding: "9px 12px",
    fontSize: 13,
    fontFamily: "Inter, sans-serif",
    outline: "none",
    color: "#1a1a2a",
    background: "#fff",
  };
  const labelStyle = {
    display: "block",
    fontSize: 12,
    fontWeight: 500,
    color: "#374151",
    marginBottom: 6,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f5f7",
        padding: 32,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #e8eaed",
          padding: 32,
        }}
      >
        <h1
          style={{
            fontSize: 20,
            fontWeight: 600,
            marginBottom: 6,
            color: "#1a1a2a",
          }}
        >
          Материал нэмэх
        </h1>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: 24 }}>
          PDF файл upload хийж материал нэмнэ
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Хичээл</label>
          <select
            style={inputStyle}
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          >
            {Object.entries(SUBJECTS).map(([key, val]) => (
              <option key={key} value={key}>
                {val.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={labelStyle}>Гарчиг</label>
          <input
            style={inputStyle}
            placeholder="жишээ: Математик 2023 ЕШ тест"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div>
            <label style={labelStyle}>Төрөл</label>
            <select
              style={inputStyle}
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
            >
              {MATERIAL_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Он</label>
            <input
              type="number"
              style={inputStyle}
              value={form.year}
              onChange={(e) => setForm({ ...form, year: e.target.value })}
            />
          </div>
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={labelStyle}>PDF файл</label>
          <div
            style={{
              border: "2px dashed #e8eaed",
              borderRadius: 10,
              padding: 24,
              textAlign: "center",
              cursor: "pointer",
              background: file ? "#f0fdf4" : "#fafafa",
              borderColor: file ? "#86efac" : "#e8eaed",
              transition: "all 0.15s",
            }}
            onClick={() => document.getElementById("pdfInput").click()}
          >
            <input
              id="pdfInput"
              type="file"
              accept=".pdf"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            {file ? (
              <div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "#15803d",
                    marginBottom: 4,
                  }}
                >
                  {file.name}
                </div>
                <div style={{ fontSize: 11, color: "#6b7280" }}>
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}
                >
                  PDF файл сонгохын тулд дарна уу
                </div>
                <div style={{ fontSize: 11, color: "#9ca3af" }}>
                  Зөвхөн .pdf формат
                </div>
              </div>
            )}
          </div>

          {uploading && (
            <div style={{ marginTop: 10 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12,
                  color: "#6b7280",
                  marginBottom: 4,
                }}
              >
                <span>Upload хийж байна...</span>
                <span>{progress}%</span>
              </div>
              <div
                style={{
                  height: 4,
                  background: "#e8eaed",
                  borderRadius: 4,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    background: "#c84b31",
                    borderRadius: 4,
                    width: `${progress}%`,
                    transition: "width 0.3s",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div
            style={{
              background: "#fef2f2",
              color: "#dc2626",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            {error}
          </div>
        )}
        {success && (
          <div
            style={{
              background: "#f0fdf4",
              color: "#16a34a",
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              marginBottom: 16,
            }}
          >
            Амжилттай нэмлээ!
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={uploading}
          style={{
            width: "100%",
            background: "#0f1f3d",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 0",
            fontSize: 14,
            fontWeight: 500,
            cursor: uploading ? "not-allowed" : "pointer",
            fontFamily: "Inter, sans-serif",
            opacity: uploading ? 0.6 : 1,
          }}
        >
          {uploading ? `Upload хийж байна... ${progress}%` : "Нэмэх"}
        </button>

        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid #f3f4f6",
            textAlign: "center",
          }}
        >
          <a
            href="/"
            style={{ fontSize: 13, color: "#6b7280", textDecoration: "none" }}
          >
            Нүүр хуудас руу буцах
          </a>
        </div>
      </div>
    </div>
  );
}
