import React from "react";
import { FileError as FileErrorType } from "../../interfaces/fileInterfaces";

interface FileErrorProps {
  fileError: FileErrorType;
}

const FileError: React.FC<FileErrorProps> = ({ fileError }) => {
  return (
    <div className="bg-red-800 text-white p-4 rounded-lg">
      <h4 className="font-medium text-base">Error: {fileError.error}</h4>
      {fileError.details && (
        <p className="mt-2 text-base">{fileError.details}</p>
      )}
    </div>
  );
};

export default FileError;
