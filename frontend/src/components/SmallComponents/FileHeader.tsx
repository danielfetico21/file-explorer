import React from "react";

interface FileHeaderProps {
  title: string;
}

const FileHeader: React.FC<FileHeaderProps> = ({ title }) => {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-800 px-4">
      <h3 className="font-medium text-gray-200">{title}</h3>
    </div>
  );
};

export default FileHeader;
