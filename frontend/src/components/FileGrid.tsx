import React, { useEffect, useState } from "react";
import { DirectoryItem, FileInfo } from "../interfaces/fileInterfaces";
import { cn } from "../utils/cn";
import FileIcon from "./FileIcon";
import { ChevronDown, ChevronUp, Calendar, Clock } from "lucide-react";

interface FileGridProps {
  files: DirectoryItem[];
  currentPath: string;
  onFileClick: (file: DirectoryItem) => void;
  selectedFilePath?: string;
  isLoading: boolean;
  loadingFileId: string | null;
  selectedFile?: FileInfo | null;
}

const FileGrid: React.FC<FileGridProps> = ({
  files,
  currentPath,
  onFileClick,
  selectedFilePath,
  isLoading,
  loadingFileId,
  selectedFile,
}) => {
  // Track whether the currently selected file should be expanded
  const [isDetailsExpanded, setIsDetailsExpanded] = useState<boolean>(false);

  const getFullPath = (fileName: string): string => {
    return currentPath === "/" ? fileName : `${currentPath}/${fileName}`;
  };

  // Reset expanded state when selected file changes
  useEffect(() => {
    if (selectedFilePath && selectedFile && !loadingFileId) {
      setIsDetailsExpanded(true);
    }
  }, [selectedFilePath, selectedFile, loadingFileId]);

  const handleFileClick = (file: DirectoryItem) => {
    const fullPath = getFullPath(file.name);

    // If clicking the same file that's already selected
    if (selectedFilePath === fullPath) {
      // Toggle expanded state
      setIsDetailsExpanded(!isDetailsExpanded);
    } else {
      // Clicking a different file
      onFileClick(file);
      // Expanded state will be set by useEffect
    }
  };

  const formatDate = (dateString?: Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <h3 className="font-medium text-gray-200">Files</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 gap-2 p-4">
          {isLoading && !loadingFileId ? (
            <div className="flex flex-col gap-2 animate-pulse">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-10 bg-gray-800/50 rounded-md"></div>
              ))}
            </div>
          ) : !files || files.length === 0 ? (
            <div className="flex items-center justify-center h-32 text-gray-400">
              No files in this directory
            </div>
          ) : (
            files.map((file) => {
              const fullPath = getFullPath(file.name);
              const isFileSelected =
                selectedFilePath === fullPath ||
                (currentPath === "/" && selectedFilePath === file.name);
              const isFileLoading = loadingFileId === file.name;
              const shouldShowExpanded =
                isFileSelected &&
                isDetailsExpanded &&
                selectedFile &&
                !isFileLoading;

              return (
                <div key={file.name} className="relative">
                  {isFileLoading && (
                    <div className="absolute inset-0 overflow-hidden rounded-lg">
                      <div className="h-full bg-blue-500/20 animate-pulse"></div>
                      <div className="absolute top-0 left-0 h-1 bg-blue-500 animate-progress"></div>
                    </div>
                  )}
                  <div
                    className={cn(
                      "rounded-lg overflow-hidden transition-all duration-200",
                      shouldShowExpanded ? "bg-gray-800" : "",
                      isFileSelected && !shouldShowExpanded ? "bg-gray-900" : ""
                    )}
                  >
                    <button
                      onClick={() => handleFileClick(file)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-left transition-colors duration-150 w-full !bg-gray-900/90 hover:!bg-gray-800/90 !border-none !outline-none",
                        isFileSelected ? "bg-gray-800/90 !important" : ""
                      )}
                    >
                      <FileIcon
                        type={file.type}
                        extension={
                          file.type === "file"
                            ? file.name.split(".").pop()
                            : undefined
                        }
                        className="w-5 h-5 text-gray-400"
                      />
                      <span className="flex-1 truncate text-gray-200">
                        {file.name}
                      </span>
                      {file.size && (
                        <span className="text-sm text-gray-500 mr-2">
                          {(file.size / 1024).toFixed(1)} KB
                        </span>
                      )}
                      {isFileSelected &&
                        selectedFile &&
                        !isFileLoading &&
                        (isDetailsExpanded ? (
                          <ChevronUp className="w-4 h-4 text-gray-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400" />
                        ))}
                    </button>

                    {/* Expandable file details section */}
                    {shouldShowExpanded && selectedFile && (
                      <div className="px-4 py-3 bg-gray-800/80 border-t border-gray-700 text-sm animate-fadeIn">
                        <div className="grid grid-cols-1 gap-3">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Created:</span>
                            <span>{formatDate(selectedFile.createdAt)}</span>
                          </div>

                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="font-medium">Modified:</span>
                            <span>{formatDate(selectedFile.modifiedAt)}</span>
                          </div>

                          {selectedFile.type && (
                            <div className="flex items-center gap-2 text-gray-300">
                              <span className="font-medium">Type:</span>
                              <span>{selectedFile.type}</span>
                            </div>
                          )}

                          {selectedFile.permissions && (
                            <div className="flex items-center gap-2 text-gray-300">
                              <span className="font-medium">Permissions:</span>
                              <span>{selectedFile.permissions}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default FileGrid;
