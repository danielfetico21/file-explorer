import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFile,
  setCurrentPath,
  setFileDetails,
  setGlobalError,
  setLoadingState,
} from "../store/fileSlice";
import { getFile } from "../api/api";
import { buildFullPath } from "../utils/path";
import handleError from "../utils/error";
import { ensureMinimumDuration } from "../utils/timers";
import { FileInfo } from "../interfaces/fileInterfaces";
import {
  selectCurrentPath,
  selectLoadingFileId,
  selectSelectedFilePath,
} from "../store/selectors";

export const useExplorerController = () => {
  const dispatch = useDispatch();
  const currentPath = useSelector(selectCurrentPath);
  const selectedFilePath = useSelector(selectSelectedFilePath);
  const loadingFileId = useSelector(selectLoadingFileId);

  const handleDirectoryClick = useCallback(
    (fullPath: string) => {
      dispatch(setCurrentPath(fullPath));
      dispatch(selectFile(""));
    },
    [dispatch]
  );

  const handleFileClick = useCallback(
    async (item: FileInfo, fullPath: string) => {
      if (selectedFilePath === fullPath && !loadingFileId) return;

      dispatch(selectFile(fullPath));
      dispatch(setLoadingState({ isLoading: true, fileId: item.name }));

      try {
        const startTime = Date.now();
        const fileDetails = await getFile(fullPath);
        await ensureMinimumDuration(startTime);

        dispatch(setFileDetails({ path: fullPath, details: fileDetails }));
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
        dispatch(setLoadingState({ isLoading: false, fileId: null }));
      }
    },
    [dispatch, selectedFilePath, loadingFileId]
  );

  const handleItemClick = useCallback(
    async (item: FileInfo) => {
      const fullPath = buildFullPath(currentPath, item.name);
      if (item.type === "file") {
        await handleFileClick(item, fullPath);
      } else {
        handleDirectoryClick(fullPath);
      }
    },
    [currentPath, handleDirectoryClick, handleFileClick]
  );

  const handleBackClick = useCallback(() => {
    if (currentPath === "/") return;
    const parentPath = currentPath.split("/").slice(0, -1).join("/") || "/";
    dispatch(setCurrentPath(parentPath));
    dispatch(selectFile(""));
  }, [currentPath, dispatch]);

  const handleBreadcrumbClick = useCallback(
    (path: string) => {
      dispatch(setCurrentPath(path));
    },
    [dispatch]
  );

  return {
    currentPath,
    handleItemClick,
    handleBackClick,
    handleBreadcrumbClick,
  };
};
