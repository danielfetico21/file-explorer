/**
 * Returnează calea completă a unui fișier, concatenând `currentPath` și `fileName`.
 *
 * @param fileName - Numele fișierului sau directorului (ex: "docs", "file.txt")
 * @param currentPath - Calea curentă în filesystem (ex: "/", "/projects")
 * @returns Calea absolută a fișierului (ex: "/file.txt", "/projects/file.txt")
 */
export function getFullPath(fileName: string, currentPath: string): string {
  return currentPath === "/" ? fileName : `${currentPath}/${fileName}`;
}

export const buildFullPath = (
  currentPath: string,
  itemName: string
): string => {
  return currentPath === "/" ? `/${itemName}` : `${currentPath}/${itemName}`;
};

/**
 * Extrage numele fișierului dintr-un path complet.
 * Exemplu: "/folder/subfolder/README.md" => "README.md"
 */
export function getFileNameFromPath(path: string): string {
  return path.split("/").filter(Boolean).pop() || "";
}
