import React from "react";
import { FileInfo } from "../../interfaces/fileInterfaces";
import { getFullPath } from "../../utils/path";
import FileItem from "./FileItem";

interface FileListProps {
  files: FileInfo[];
  focusedIndex: number;
  expandedFilePaths: string[];
  selectedFile: FileInfo | null;
  loadingFileId?: string | null;
  onClick: (file: FileInfo) => void;
  currentPath: string;
}

const FileList: React.FC<FileListProps> = ({
  files,
  focusedIndex,
  expandedFilePaths,
  selectedFile,
  loadingFileId,
  onClick,
  currentPath,
}) => {
  return (
    <>
      {files.map((file, index) => {
        const fullPath = getFullPath(file.name, currentPath);
        const key = `${currentPath}/${file.name}`;
        return (
          <React.Fragment key={key}>
            <FileItem
              file={file}
              isDetailsExpanded={expandedFilePaths.includes(fullPath)}
              isFileLoading={loadingFileId === file.name}
              selectedFile={selectedFile}
              onClick={() => onClick(file)}
              isFocused={index === focusedIndex}
              data-index={index}
            />
            <hr className="text-gray-800" />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default React.memo(FileList);
