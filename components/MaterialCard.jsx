"use client";

const TAG_STYLE = {
  Тест: "bg-blue-50 text-blue-700",
  Лекц: "bg-green-50 text-green-700",
  Дасгал: "bg-orange-50 text-orange-700",
  Жишиг: "bg-purple-50 text-purple-700",
};

export default function MaterialCard({
  material,
  saved,
  onToggleSave,
  onView,
}) {
  const tagClass = TAG_STYLE[material.type] || TAG_STYLE["Тест"];

  return (
    <div
      className="bg-white border border-[#e8eaed] rounded-xl p-4 relative transition-all hover:shadow-lg hover:shadow-black/5 flex flex-col min-h-[220px]"
    >
      <button
        onClick={() => onToggleSave(material.id)}
        className={`absolute top-3 right-3 text-[10px] font-semibold transition-colors cursor-pointer ${
          saved ? "text-[#c84b31]" : "text-gray-300 hover:text-gray-400"
        }`}
      >
        {saved ? "Хадгалсан" : "Хадгалах"}
      </button>

      <div className="flex-1">
        <div className="w-10 h-12 bg-[#fff5f4] border border-[#fdd] rounded-lg flex items-end justify-center pb-1.5 mb-3">
          <span className="bg-[#c84b31] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-[3px]">
            PDF
          </span>
        </div>

        <div className="text-[13px] font-semibold text-[#1a1a2a] mb-2 pr-6 line-clamp-2 leading-tight">
          {material.title}
        </div>

        <div className="flex items-center gap-1.5 mb-4">
          <span className="text-[11px] text-[#6b7280]">
            {material.year} он
          </span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${tagClass}`}>
            {material.type}
          </span>
        </div>
      </div>

      <div className="flex gap-1.5 mt-auto pt-2">
        <button
          onClick={() => onView(material)}
          className="flex-1 py-1.5 rounded-lg text-xs font-medium bg-[#0f1f3d] text-white cursor-pointer hover:bg-[#1a2a4a] transition-colors"
        >
          Үзэх
        </button>
        <a
          href={material.file_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-1.5 rounded-lg text-xs border border-[#e8eaed] bg-[#f4f5f7] text-[#6b7280] hover:bg-[#e8eaed] transition-colors flex items-center"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </a>
      </div>
    </div>
  );
}
