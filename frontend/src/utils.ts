export function normalizeString(text: string) {
  return text
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll("ł", "l")
    .replaceAll("Ł", "L");
}
