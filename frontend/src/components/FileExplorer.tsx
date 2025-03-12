import { useEffect } from "react";
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
  setGlobalError,
} from "../store/fileSlice";
import { RootState } from "../store/store";
import FileTitle from "./FileTitle";
import { FileInfo } from "../interfaces/fileInterfaces";
import handleError from "../utils/error";

const FileExplorer: React.FC = () => {
  const dispatch = useDispatch();

  const { currentPath, loadingFileId, selectedFilePath } = useSelector(
    (state: RootState) => state.files
  );

  useEffect(() => {
    const fetchDirectoryContents = async () => {
      dispatch(setLoadingState({ isLoading: true }));

      try {
        const data = await getAllFiles(currentPath);

        dispatch(setFiles(data.contents));
        dispatch(setGlobalError(null));
      } catch (error) {
        const fileError = handleError(error);
        dispatch(
          setGlobalError({
            type: "error",
            error: fileError?.error,
            details: fileError?.details,
          })
        );
      } finally {
        dispatch(setLoadingState({ isLoading: false }));
      }
    };

    fetchDirectoryContents();
  }, [currentPath, dispatch]);

  const handleItemClick = async (item: FileInfo) => {
    const fullPath = buildFullPath(currentPath, item.name);

    if (item.type === "file") {
      await handleFileClick(item, fullPath);
    } else {
      handleDirectoryClick(fullPath);
    }
  };

  const handleDirectoryClick = (fullPath: string) => {
    dispatch(setCurrentPath(fullPath));
    dispatch(selectFile(""));
  };

  const buildFullPath = (currentPath: string, itemName: string): string => {
    return currentPath === "/" ? `/${itemName}` : `${currentPath}/${itemName}`;
  };

  const handleFileClick = async (item: FileInfo, fullPath: string) => {
    if (selectedFilePath === fullPath && !loadingFileId) {
      return;
    }

    dispatch(selectFile(fullPath));
    dispatch(setLoadingState({ isLoading: true, fileId: item.name }));

    try {
      const startTime = Date.now();
      const fileDetails = await getFile(fullPath);
      await ensureMinimumLoadingTime(startTime);

      dispatch(setFileDetails({ path: fullPath, details: fileDetails }));
      dispatch(setGlobalError(null));
    } catch (error) {
      handleFileError(error);
    } finally {
      // Resetăm starea de încărcare indiferent de rezultat
      dispatch(setLoadingState({ isLoading: false, fileId: null }));
    }
  };

  const ensureMinimumLoadingTime = async (
    startTime: number,
    minimumMs: number = 1000
  ) => {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime < minimumMs) {
      await new Promise((resolve) =>
        setTimeout(resolve, minimumMs - elapsedTime)
      );
    }
  };

  const handleFileError = (error: unknown) => {
    const fileError = handleError(error);
    dispatch(
      setGlobalError({
        type: "error",
        error: fileError?.error,
        details: fileError?.details,
      })
    );
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
