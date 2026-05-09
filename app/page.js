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
    <div className="min-h-screen bg-[#f4f5f7] font-sans antialiased">
      {viewing && (
        <PdfViewer
          url={viewing.file_url}
          title={viewing.title}
          onClose={() => setViewing(null)}
        />
      )}

      <div className="fixed top-0 left-0 right-0 z-34 flex h-[54px] items-center gap-4 bg-[#0f1f3d] px-4 md:px-5">
        <div className="flex w-auto shrink-0 items-center gap-2.5 md:w-[220px]">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-[#c84b31] to-[#e8603c] text-[11px] font-bold text-white">
            M
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold text-white">
              ЭЕШ материалууд
            </div>
          </div>
        </div>

        <div className="flex-1 max-w-lg">
          <input
            className="w-full rounded-lg border border-white/10 bg-white/7 px-3.5 py-2 text-sm text-white outline-none placeholder:text-gray-400 focus:border-white/20 transition-all"
            placeholder="Хайх... (жишээ: математик 2023)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="hidden md:flex items-center ml-auto text-[11px] text-[#8a9ab8] border border-white/10 rounded-md px-2.5 py-1">
          Эх сурвалж:&nbsp;
          <a
            href="http://ebook.eec.mn"
            target="_blank"
            rel="noreferrer"
            className="text-[#c8d8f0] hover:text-white transition-colors"
          >
            ebook.eec.mn
          </a>
        </div>
      </div>

      <div className="flex flex-col md:flex-row pt-[54px]">
        <Sidebar current={subject} onSelect={setSubject} counts={counts} />

        <div className="flex-1 p-4 md:p-6 md:ml-[220px]">
          <div className="mb-5">
            <h1 className="text-xl md:text-2xl font-semibold text-[#1a1a2a]">
              {subjectName}
            </h1>
            <p className="text-xs md:text-sm text-[#6b7280] mt-1">
              Нийт {filtered.length} материал
            </p>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            {["all", ...MATERIAL_TYPES].map((t) => (
              <button
                key={t}
                onClick={() => setType(t)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border ${
                  type === t
                    ? "bg-[#0f1f3d] text-white border-[#0f1f3d]"
                    : "bg-white text-[#6b7280] border-[#e8eaed] hover:border-[#ccd0d5]"
                }`}
              >
                {t === "all" ? "Бүгд" : t}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20 text-[#6b7280]">
              Ачааллаж байна...
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-[#6b7280]">
              <h3 className="text-base font-medium text-[#1a1a2a] mb-1.5">
                Материал олдсонгүй
              </h3>
              <p className="text-sm">Өөр түлхүүр үгээр хайж үзнэ үү</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5">
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
