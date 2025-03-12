import React from "react";
import { DirectoryItem } from "../interfaces/fileInterfaces";
import { useSelector, useDispatch } from "react-redux";
import { selectFile, toggleFileExpansion } from "../store/fileSlice";
import { RootState } from "../store/store";
import BackButton from "./SmallComponents/BackButton";
import LoadingFilesSkeleton from "./SmallComponents/LoadingFilesSkeleton";
import EmptyState from "./SmallComponents/EmptyState";
import FileItem from "./SmallComponents/FileItem";
import FileHeader from "./SmallComponents/FileHeader";

interface FileGridProps {
  onFileClick: (file: DirectoryItem) => void;
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
    loadingFileId,
  } = useSelector((state: RootState) => state.files);

  const selectedFile = selectedFilePath ? fileDetails[selectedFilePath] : null;

  const getFullPath = (fileName: string): string => {
    return currentPath === "/" ? fileName : `${currentPath}/${fileName}`;
  };

  const handleFileClick = (file: DirectoryItem) => {
    const fullPath = getFullPath(file.name);

    dispatch(selectFile(fullPath));
    dispatch(toggleFileExpansion(fullPath));

    onFileClick(file);
  };

  return (
    <div className="w-full h-full flex flex-col">
      <FileHeader title="Files" />

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-2 py-4">
          {currentPath !== "/" && <BackButton onBackClick={onBackClick} />}

          {isLoading && !loadingFileId ? (
            <LoadingFilesSkeleton />
          ) : !files || files.length === 0 ? (
            <EmptyState />
          ) : (
            files.map((file: DirectoryItem) => {
              const fullPath = getFullPath(file.name);
              return (
                <FileItem
                  key={file.name}
                  file={file}
                  isDetailsExpanded={expandedFilePaths.includes(fullPath)}
                  isFileLoading={loadingFileId === file.name}
                  selectedFile={selectedFile}
                  onClick={() => handleFileClick(file)}
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
