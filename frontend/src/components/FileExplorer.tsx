import { useEffect } from "react";
import { DirectoryItem } from "../interfaces/fileInterfaces";
import { getAllFiles, getFile } from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import FileGrid from "./FileGrid";
import Breadcrumbs from "./Breadcrumbs";
import {
  setFiles,
  setCurrentPath,
  setLoadingState,
  setFileDetails,
  selectFile,
} from "../store/fileSlice";
import { RootState } from "../store/store";
import FileTitle from "./FileTitle";

const FileExplorer: React.FC = () => {
  const dispatch = useDispatch();

  const { currentPath, loadingFileId, selectedFilePath } = useSelector(
    (state: RootState) => state.files
  );

  useEffect(() => {
    const fetchDirectoryContents = async () => {
      dispatch(setLoadingState({ isLoading: true }));

      const startTime = Date.now();

      try {
        const data = await getAllFiles(currentPath);

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 500) {
          await new Promise((resolve) =>
            setTimeout(resolve, 500 - elapsedTime)
          );
        }

        dispatch(setFiles(data));
      } catch (error) {
        console.error("Error fetching files", error);
      } finally {
        dispatch(setLoadingState({ isLoading: false }));
      }
    };

    fetchDirectoryContents();
  }, [currentPath, dispatch]);

  const handleItemClick = async (item: DirectoryItem) => {
    const fullPath =
      currentPath === "/" ? `/${item.name}` : `${currentPath}/${item.name}`;

    if (item.type === "file") {
      if (selectedFilePath === fullPath && !loadingFileId) {
        return;
      }

      // Set loading state for file
      dispatch(selectFile(fullPath));
      dispatch(setLoadingState({ isLoading: true, fileId: item.name }));

      const startTime = Date.now();

      try {
        const details = await getFile(fullPath);

        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < 500) {
          await new Promise((resolve) =>
            setTimeout(resolve, 500 - elapsedTime)
          );
        }

        dispatch(setFileDetails({ path: fullPath, details }));
      } catch (error) {
        console.error("Error fetching file details", error);
      } finally {
        dispatch(setLoadingState({ isLoading: false, fileId: null }));
      }
    } else {
      dispatch(setCurrentPath(fullPath));
      dispatch(selectFile(""));
    }
  };

  const handleBackClick = () => {
    if (currentPath === "/") return;
    const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
    dispatch(setCurrentPath(parentPath));
    dispatch(selectFile(""));
  };

  const handleBreadcrumbClick = (path: string) => {
    dispatch(setCurrentPath(path));
  };

  return (
    <div className="flex flex-col h-full">
      <FileTitle />
      <Breadcrumbs
        currentPath={currentPath}
        onBreadcrumbClick={(path) => handleBreadcrumbClick(path)}
      />
      <div className="flex flex-1 overflow-hidden">
        <FileGrid onFileClick={handleItemClick} onBackClick={handleBackClick} />
      </div>
    </div>
  );
};

export default FileExplorer;
