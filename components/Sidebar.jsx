"use client";
import { SUBJECTS } from "@/types";

export default function Sidebar({ current, onSelect, counts }) {
  const navItem = (key, label) => (
    <button
      key={key}
      onClick={() => onSelect(key)}
      className={`flex items-center gap-2.5 px-3 py-2 mx-1 md:mx-2 rounded-lg cursor-pointer border-none text-left transition-all shrink-0 md:shrink md:w-[calc(100%-16px)] ${
        current === key 
          ? "bg-[#c84b31]/15 text-[#f0d0c8]" 
          : "bg-transparent text-[#8a9ab8] hover:bg-white/5"
      }`}
    >
      <span className="text-xs md:text-[13px] whitespace-nowrap flex-1">{label}</span>
      <span
        className={`text-[9px] md:text-[10px] px-1.5 py-0.5 rounded-full ${
          current === key ? "bg-[#c84b31]/20 text-[#d09080]" : "bg-white/7 text-[#5a6a8a]"
        }`}
      >
        {counts[key] || 0}
      </span>
    </button>
  );

  const sectionLabel = (text) => (
    <div className="hidden md:block text-[9px] font-semibold text-[#3a4a6a] uppercase tracking-wider px-4 pt-2.5 pb-1">
      {text}
    </div>
  );

  return (
    <div className="md:fixed md:top-[54px] md:left-0 md:bottom-0 md:w-[220px] bg-[#0f1f3d] border-b md:border-b-0 md:border-r border-white/5 flex flex-col z-50">
      <div className="flex md:flex-col overflow-x-auto md:overflow-y-auto no-scrollbar md:py-3 flex-1 px-1 md:px-0 scroll-smooth items-center md:items-stretch h-12 md:h-auto">
        {sectionLabel("Үндсэн")}
        {navItem("all", "Бүх материал")}

        {sectionLabel("Хичээлүүд")}
        {Object.entries(SUBJECTS).map(([key, val]) => navItem(key, val.name))}

        {sectionLabel("Миний")}
        {navItem("saved", "Хадгалсан")}
      </div>

      <div className="hidden md:block p-3 border-t border-white/5">
        <div className="bg-[#c84b31]/8 border border-[#c84b31]/15 rounded-lg p-2.5">
          <p className="text-[10px] text-[#8a7a78] leading-relaxed">
            Эх сурвалж:{" "}
            <a
              href="http://ebook.eec.mn"
              target="_blank"
              className="text-[#d09080] hover:underline"
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
