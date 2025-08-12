// Genera la secuencia de páginas con elipsis
export function getPages(page, total) {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (page <= 3) return [1, 2, 3, "...", total];
  if (page >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", page - 1, page, page + 1, "...", total];
}
