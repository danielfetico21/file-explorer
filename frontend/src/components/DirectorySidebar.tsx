import React from "react";
import { DirectoryItem } from "../interfaces/fileInterfaces";
import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "../utils/cn";
import FileIcon from "./FileIcon";

interface DirectorySidebarProps {
  directories: DirectoryItem[];
  currentPath: string;
  onDirectoryClick: (directory: DirectoryItem) => void;
  onBackClick: () => void;
  selectedDirectoryPath?: string;
  isLoading: boolean;
}

const DirectorySidebar: React.FC<DirectorySidebarProps> = ({
  directories,
  currentPath,
  onDirectoryClick,
  onBackClick,
  selectedDirectoryPath,
  isLoading,
}) => {
  const getFullPath = (dirName: string): string => {
    return currentPath === "/" ? `/${dirName}` : `${currentPath}/${dirName}`;
  };

  return (
    <div className="w-1/3 border-r border-gray-800 h-full flex flex-col">
      <div className="flex items-center justify-between p-2 border-b border-gray-800">
        <h3 className="font-medium text-gray-200">Directories</h3>
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="flex flex-col gap-2 p-4">
          {currentPath !== "/" && (
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm text-gray-200 rounded-md !bg-transparent hover:!bg-gray-800/90 !border-none !outline-none transition-colors"
              onClick={onBackClick}
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
          )}

          {isLoading ? (
            <div className="flex flex-col gap-2 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-10 bg-gray-800/50 rounded-md"></div>
              ))}
            </div>
          ) : directories.length === 0 ? (
            <div className="text-gray-400 py-4 text-center">
              No directories found
            </div>
          ) : (
            directories.map((dir) => {
              const fullPath = getFullPath(dir.name);
              const isSelected = selectedDirectoryPath === fullPath;

              return (
                <button
                  key={dir.name}
                  onClick={() => onDirectoryClick(dir)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md text-left transition-colors duration-150 !bg-gray-900/90 hover:!bg-gray-800/90 !border-none !outline-none"
                  )}
                  aria-selected={isSelected}
                >
                  <FileIcon
                    type="directory"
                    className="w-5 h-5 text-gray-400"
                  />
                  <span className="flex-1 truncate text-gray-200">
                    {dir.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-500" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default DirectorySidebar;
