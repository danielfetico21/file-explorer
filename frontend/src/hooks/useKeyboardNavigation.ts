import { useEffect, useState } from "react";
import { FileInfo } from "../interfaces/fileInterfaces";

export function useKeyboardNavigation(
  files: FileInfo[] | null,
  onFileSelect: (file: FileInfo) => void,
  onBackClick: () => void,
  currentPath: string
) {
  const [focusedIndex, setFocusedIndex] = useState(-1);

  useEffect(() => {
    if (!files) return;

    if (files.length === 0 && focusedIndex !== -1) {
      setFocusedIndex(-1);
    }

    if (files.length > 0 && focusedIndex === -1) {
      setFocusedIndex(0);
    }
  }, [files, focusedIndex]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ignoră dacă focusul e pe inputuri, textarea, select
      const tag = document.activeElement?.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag || "")) return;

      if (!files || files.length === 0) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, files.length - 1));
          break;
        case "ArrowUp":
          event.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter": {
          event.preventDefault();
          const selectedFile = files[focusedIndex];
          if (selectedFile) {
            onFileSelect(selectedFile);
          }
          break;
        }
        case "Escape":
          event.preventDefault();
          if (currentPath !== "/") {
            onBackClick();
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [files, focusedIndex, currentPath, onFileSelect, onBackClick]);

  return { focusedIndex, setFocusedIndex };
}
