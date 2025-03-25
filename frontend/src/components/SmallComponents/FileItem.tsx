import React from "react";
import { FileInfo } from "../../interfaces/fileInterfaces";
import { cn } from "../../utils/cn";
import FileIcon from "../FileIcon";
import FileDetails from "./FileDetails";

interface FileItemProps {
  file: FileInfo;
  isDetailsExpanded: boolean;
  isFileLoading: boolean;
  selectedFile: FileInfo | null;
  onClick: () => void;
  isFocused?: boolean;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  isDetailsExpanded,
  isFileLoading,
  selectedFile,
  onClick,
  isFocused = false,
}) => {
  const isSelected = selectedFile?.name === file.name;
  const shouldShowDetails = isSelected && isDetailsExpanded && !isFileLoading;

  const getExtension = () =>
    file.type === "file" ? file.name.split(".").pop() : undefined;

  const renderLoadingOverlay = () => (
    <div className="absolute inset-0 overflow-hidden rounded-lg">
      <div className="h-full bg-blue-500/20 animate-pulse"></div>
      <div className="absolute top-0 left-0 h-1 bg-blue-500 animate-progress"></div>
    </div>
  );

  const renderHeader = () => (
    <button
      onClick={onClick}
      aria-selected={isSelected}
      aria-expanded={isDetailsExpanded}
      aria-busy={isFileLoading}
      className={cn(
        "flex items-center gap-3 px-3 text-left transition-colors duration-150 w-full !bg-transparent hover:!bg-gray-800/90 !border-none !outline-none",
        isFocused && "!bg-gray-800/90"
      )}
    >
      <FileIcon
        type={file.type}
        extension={getExtension()}
        className="w-5 h-5 text-gray-400"
      />
      <span className="flex-1 truncate text-gray-200">{file.name}</span>
      {file.size && (
        <span className="text-sm text-gray-500 mr-2">
          {(file.size / 1024).toFixed(1)} KB
        </span>
      )}
    </button>
  );

  return (
    <div className="relative">
      {isFileLoading && renderLoadingOverlay()}

      <div
        className={cn(
          "rounded-lg overflow-hidden transition-all duration-200",
          isFocused && "ring-2 ring-blue-500",
          shouldShowDetails && "bg-gray-900"
        )}
      >
        {renderHeader()}
        {shouldShowDetails && selectedFile && (
          <FileDetails selectedFile={selectedFile} />
        )}
      </div>
    </div>
  );
};

export default React.memo(FileItem);
