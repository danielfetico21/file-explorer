import React from "react";
import { FileInfo } from "../../interfaces/fileInterfaces";
import { cn } from "../../utils/cn";
import FileIcon from "../FileIcon";
import { ChevronDown, ChevronUp } from "lucide-react";
import FileDetails from "./FileDetails";

interface FileItemProps {
  file: FileInfo;
  isDetailsExpanded: boolean;
  isFileLoading: boolean;
  selectedFile: FileInfo | null;
  onClick: () => void;
}

const FileItem: React.FC<FileItemProps> = ({
  file,
  isDetailsExpanded,
  isFileLoading,
  selectedFile,
  onClick,
}) => {
  const shouldShowExpanded =
    isDetailsExpanded && selectedFile && !isFileLoading;

  return (
    <div className="relative">
      {isFileLoading && (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          <div className="h-full bg-blue-500/20 animate-pulse"></div>
          <div className="absolute top-0 left-0 h-1 bg-blue-500 animate-progress"></div>
        </div>
      )}
      <div
        className={cn(
          "rounded-lg overflow-hidden transition-all duration-200",
          shouldShowExpanded ? "bg-gray-900" : ""
        )}
      >
        <button
          onClick={onClick}
          className="flex items-center gap-3 px-3 py-2 text-left transition-colors duration-150 w-full !bg-gray-900/90 hover:!bg-gray-800/90 !border-none !outline-none"
        >
          <FileIcon
            type={file.type}
            extension={
              file.type === "file" ? file.name.split(".").pop() : undefined
            }
            className="w-5 h-5 text-gray-400"
          />
          <span className="flex-1 truncate text-gray-200">{file.name}</span>
          {file.size && (
            <span className="text-sm text-gray-500 mr-2">
              {(file.size / 1024).toFixed(1)} KB
            </span>
          )}
          {selectedFile &&
            !isFileLoading &&
            (isDetailsExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            ))}
        </button>

        {shouldShowExpanded && selectedFile && (
          <FileDetails selectedFile={selectedFile} />
        )}
      </div>
    </div>
  );
};

export default FileItem;
