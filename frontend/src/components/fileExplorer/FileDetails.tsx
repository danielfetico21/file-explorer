import React from "react";
import { FileInfo } from "../../interfaces/fileInterfaces";
import { Calendar, Clock, FileLock2, FileType2 } from "lucide-react";

interface FileDetailsProps {
  selectedFile: FileInfo | null;
}

const FileDetails: React.FC<FileDetailsProps> = ({ selectedFile }) => {
  if (!selectedFile) return null;

  const formatDate = (dateString: Date) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="px-4 py-3 bg-gray-900/80 border-t border-gray-800 text-sm animate-fadeIn">
      <div className="grid grid-cols-1 gap-3">
        {selectedFile.type && (
          <div className="flex items-center gap-2 text-gray-300">
            <FileType2 className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Type:</span>
            <span>{selectedFile.type}</span>
          </div>
        )}

        {selectedFile.permissions && (
          <div className="flex items-center gap-2 text-gray-300">
            <FileLock2 className="w-4 h-4 text-gray-400" />
            <span className="font-medium">Permissions:</span>
            <span>{selectedFile.permissions}</span>
          </div>
        )}

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
      </div>
    </div>
  );
};

export default FileDetails;
