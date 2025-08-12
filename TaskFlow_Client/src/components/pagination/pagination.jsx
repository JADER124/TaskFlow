import React from "react";
import { getPages } from "./getPages";

export function Pagination({ page, totalPages, onPageChange }) {
  const goto = (p) => {
    if (p < 1 || p > totalPages) return;
    onPageChange(p);
  };

  const pages = getPages(page, totalPages);

  return (
    <div className="flex space-x-2">
      <button
        onClick={() => goto(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 ${
          page === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Anterior
      </button>

      {pages.map((p, idx) =>
        p === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-1 text-gray-400 select-none">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => goto(p)}
            className={`px-3 py-1 rounded-md text-sm ${
              p === page
                ? "bg-blue-500 text-white"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => goto(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50 ${
          page === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Siguiente
      </button>
    </div>
  );
}
