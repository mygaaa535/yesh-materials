"use client";

export default function PdfViewer({ url, title, onClose }) {
  return (
    <div className="fixed inset-0 z-1000 bg-black/80 flex flex-col backdrop-blur-sm">
      <div className="bg-[#0f1f3d] px-4 h-[52px] flex items-center gap-3 shrink-0 border-b border-white/5">
        <span className="text-white text-sm font-medium flex-1 truncate">
          {title}
        </span>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white/10 hover:bg-white/15 text-white rounded-lg px-3 py-1.5 text-xs transition-colors hidden sm:block"
        >
          Шууд нээх
        </a>

        <button
          onClick={onClose}
          className="bg-[#c84b31] hover:bg-[#b0402a] text-white rounded-lg px-4 py-1.5 text-xs font-medium cursor-pointer transition-colors"
        >
          Хаах
        </button>
      </div>

      <div className="flex-1 bg-[#525659] relative overflow-hidden">
        <div className="sm:hidden absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] pointer-events-none">
          {/* <div className="bg-black/40 backdrop-blur-md text-white/80 text-[10px] py-1.5 px-3 rounded-full text-center">
            Утсан дээр гүйцэд харагдахгүй бол "Шууд нээх" товчийг дарна уу
          </div> */}
        </div>

        <div className="sm:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-auto">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-[#0f1f3d] shadow-xl rounded-full px-6 py-2.5 text-xs font-bold transition-transform active:scale-95 flex items-center gap-2"
          >
            <span>Шууд нээх</span>
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        <iframe
          src={`${url}#toolbar=0&navpanes=0&scrollbar=1`}
          className="w-full h-full border-none"
          title={title}
        />
      </div>
    </div>
  );
}
