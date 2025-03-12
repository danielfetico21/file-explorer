import React, { useEffect, useRef, useState } from "react";
import { FileInfo } from "../interfaces/fileInterfaces";
import { useSelector, useDispatch } from "react-redux";
import { selectFile, toggleFileExpansion } from "../store/fileSlice";
import { RootState } from "../store/store";
import BackButton from "./SmallComponents/BackButton";
import LoadingFilesSkeleton from "./SmallComponents/LoadingFilesSkeleton";
import EmptyState from "./SmallComponents/EmptyState";
import FileItem from "./SmallComponents/FileItem";
import FileHeader from "./SmallComponents/FileHeader";
import FileError from "./SmallComponents/FIleError";

interface FileGridProps {
  onFileClick: (file: FileInfo) => void;
  onBackClick: () => void;
}

const FileGrid: React.FC<FileGridProps> = ({ onFileClick, onBackClick }) => {
  const dispatch = useDispatch();
  const {
    files,
    currentPath,
    selectedFilePath,
    expandedFilePaths,
    fileDetails,
    isLoading,
    globalError,
    loadingFileId,
  } = useSelector((state: RootState) => state.files);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const gridRef = useRef<HTMLDivElement>(null);
  const selectedFile = selectedFilePath ? fileDetails[selectedFilePath] : null;

  const getFullPath = (fileName: string): string => {
    return currentPath === "/" ? fileName : `${currentPath}/${fileName}`;
  };

  const handleFileClick = (file: FileInfo) => {
    const fullPath = getFullPath(file.name);

    if (selectedFilePath === fullPath) {
      dispatch(toggleFileExpansion(fullPath));
    } else {
      dispatch(selectFile(fullPath));

      if (file.type === "file") {
        dispatch(toggleFileExpansion(fullPath));
      }
    }

    onFileClick(file);
  };

  useEffect(() => {
    setFocusedIndex(files && files.length > 0 ? 0 : -1);
  }, [files, currentPath]);

  useEffect(() => {
    if (gridRef.current) {
      gridRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (focusedIndex >= 0 && gridRef.current) {
      const focusedElement = gridRef.current.querySelector(
        `[data-index="${focusedIndex}"]`
      ) as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }, [focusedIndex]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!files || files.length === 0) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setFocusedIndex((prevIndex) =>
          Math.min(prevIndex + 1, files.length - 1)
        );
        break;
      case "ArrowUp":
        event.preventDefault();
        setFocusedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case "Enter":
        event.preventDefault();
        if (focusedIndex >= 0 && focusedIndex < files.length) {
          const file = files[focusedIndex];
          handleFileClick(file);
        }
        break;
      case "Escape":
        event.preventDefault();
        if (currentPath !== "/") {
          onBackClick();
        }
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <FileHeader title="Files" />

      <div
        className="flex-1 overflow-y-auto px-2"
        ref={gridRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="grid grid-cols-1 gap-2 py-4">
          {currentPath !== "/" && <BackButton onBackClick={onBackClick} />}

          {isLoading && !loadingFileId ? (
            <LoadingFilesSkeleton />
          ) : globalError ? (
            <FileError fileError={globalError} />
          ) : !files || files.length === 0 ? (
            <EmptyState />
          ) : (
            files.map((file, index) => {
              const fullPath = getFullPath(file.name);
              return (
                <FileItem
                  key={file.name}
                  file={file}
                  isDetailsExpanded={expandedFilePaths.includes(fullPath)}
                  isFileLoading={loadingFileId === file.name}
                  selectedFile={selectedFile}
                  onClick={() => handleFileClick(file)}
                  isFocused={index === focusedIndex}
                  data-index={index}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FileGrid;
