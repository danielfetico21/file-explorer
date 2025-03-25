import React, { useEffect, useRef } from "react";
import { FileInfo } from "../../interfaces/fileInterfaces";
import { useSelector, useDispatch } from "react-redux";
import { selectFile, toggleFileExpansion } from "../../store/fileSlice";
import { getFullPath } from "../../utils/path";
import { scrollIntoViewIfNeeded } from "../../utils/dom";
import { useKeyboardNavigation } from "../../hooks/useKeyboardNavigation";
import { selectFilesState } from "../../store/selectors";
import FileError from "./FileError";
import FileHeader from "./FileHeader";
import EmptyState from "../shared/EmptyState";
import BackButton from "../shared/BackButton";
import FileList from "./FileList";

interface FileGridProps {
  onFileClick: (file: FileInfo) => void;
  onBackClick: () => void;
  initialLoadDone: boolean;
}

const FileGrid: React.FC<FileGridProps> = ({
  onFileClick,
  onBackClick,
  initialLoadDone,
}) => {
  const dispatch = useDispatch();

  const {
    files,
    currentPath,
    selectedFilePath,
    expandedFilePaths,
    fileDetails,
    globalError,
    loadingFileId,
  } = useSelector(selectFilesState);

  const gridRef = useRef<HTMLDivElement>(null);
  const selectedFile = selectedFilePath ? fileDetails[selectedFilePath] : null;

  const handleFileClick = (file: FileInfo) => {
    const fullPath = getFullPath(file.name, currentPath);
    const isFile = file.type === "file";

    if (selectedFilePath === fullPath) {
      dispatch(toggleFileExpansion(fullPath));
    } else {
      dispatch(selectFile(fullPath));

      if (isFile) {
        dispatch(toggleFileExpansion(fullPath));
      }
    }

    onFileClick(file);
  };

  const { focusedIndex } = useKeyboardNavigation(
    files,
    handleFileClick,
    onBackClick,
    currentPath
  );

  useEffect(() => {
    if (focusedIndex >= 0 && gridRef.current) {
      const focusedElement = gridRef.current.querySelector<HTMLElement>(
        `[data-index="${focusedIndex}"]`
      );
      if (focusedElement) {
        scrollIntoViewIfNeeded(focusedElement);
      }
    }
  }, [focusedIndex]);

  const renderContent = () => {
    if (!initialLoadDone) {
      return null;
    }

    if (globalError) {
      return <FileError fileError={globalError} />;
    }

    if (!files || files.length === 0) {
      return <EmptyState />;
    }

    return (
      <FileList
        files={files}
        focusedIndex={focusedIndex}
        expandedFilePaths={expandedFilePaths}
        selectedFile={selectedFile}
        loadingFileId={loadingFileId}
        onClick={handleFileClick}
        currentPath={currentPath}
      />
    );
  };

  return (
    <div className="w-full h-full flex flex-col">
      <FileHeader title="Files" />

      <div
        className="flex-1 overflow-y-auto px-2"
        ref={gridRef}
        role="list"
        aria-label="File list"
      >
        <div className="grid grid-cols-1 gap-2 py-4">
          {currentPath !== "/" && <BackButton onBackClick={onBackClick} />}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default React.memo(FileGrid);
