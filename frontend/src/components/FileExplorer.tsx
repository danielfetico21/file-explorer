import { useEffect, useState } from "react";
import { DirectoryItem, FileInfo } from "../interfaces/fileInterfaces";
import { getAllFiles, getFile } from "../api/api";
import DirectorySidebar from "./DirectorySidebar";
import FileGrid from "./FileGrid";
import Breadcrumbs from "./Breadcrumbs";

const FileExplorer = () => {
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [items, setItems] = useState<DirectoryItem[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileInfo | null>(null);
  const [isDirectoryLoading, setIsDirectoryLoading] = useState<boolean>(false);
  const [isFileLoading, setIsFileLoading] = useState<boolean>(false);
  const [loadingFileId, setLoadingFileId] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirectoryContents = async () => {
      setIsDirectoryLoading(true);

      const startTime = Date.now();

      try {
        const data = await getAllFiles(currentPath);

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 500) {
          await new Promise((resolve) =>
            setTimeout(resolve, 500 - elapsedTime)
          );
        }

        setItems(data);
      } catch (error) {
        console.error("Error fetching files", error);
      } finally {
        setIsDirectoryLoading(false);
      }
    };

    fetchDirectoryContents();
  }, [currentPath]);

  const handleItemClick = async (item: DirectoryItem) => {
    if (item.type === "file") {
      if (selectedFile?.name === item.name && !isFileLoading) {
        return;
      }

      setIsFileLoading(true);
      setLoadingFileId(item.name);

      const startTime = Date.now();

      try {
        const details = await getFile(
          currentPath === "/" ? `/${item.name}` : `${currentPath}/${item.name}`
        );

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 500) {
          await new Promise((resolve) =>
            setTimeout(resolve, 500 - elapsedTime)
          );
        }

        setSelectedFile(details);
      } catch (error) {
        console.error("Error fetching file details", error);
      } finally {
        setIsFileLoading(false);
        setLoadingFileId(null);
      }
    } else {
      setCurrentPath(
        currentPath === "/" ? `/${item.name}` : `${currentPath}/${item.name}`
      );
      setSelectedFile(null);
    }
  };

  const handleBackClick = () => {
    if (currentPath === "/") return;
    const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
    setCurrentPath(parentPath);
    setSelectedFile(null);
  };

  const directories = items.filter((item) => item.type === "directory");
  const files = items.filter((item) => item.type === "file");

  return (
    <div className="flex flex-col h-screen">
      <Breadcrumbs
        currentPath={currentPath}
        onBreadcrumbClick={(path) => setCurrentPath(path)}
      />
      <div className="flex flex-1 overflow-hidden">
        <DirectorySidebar
          directories={directories}
          currentPath={currentPath}
          onDirectoryClick={handleItemClick}
          onBackClick={handleBackClick}
          selectedDirectoryPath={selectedFile?.name}
          isLoading={isDirectoryLoading}
        />
        <div className="relative flex-1 overflow-hidden">
          <FileGrid
            files={files}
            currentPath={currentPath}
            onFileClick={handleItemClick}
            selectedFilePath={selectedFile?.name}
            isLoading={isFileLoading}
            loadingFileId={loadingFileId}
            selectedFile={selectedFile}
          />
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
