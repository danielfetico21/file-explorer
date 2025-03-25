import React from "react";

interface FileHeaderProps {
  title: string;
}

const FileHeader: React.FC<FileHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800 px-4">
      <h3 className="font-medium text-gray-200">{title}</h3>

      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-400">Keys:</span>
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
          ↑
        </kbd>
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
          ↓
        </kbd>
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
          Enter ↑
        </kbd>
        <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700">
          ← Esc
        </kbd>
      </div>
    </div>
  );
};

export default FileHeader;
