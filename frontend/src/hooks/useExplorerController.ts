import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFile,
  setCurrentPath,
  setFileDetails,
  setGlobalError,
} from "../store/fileSlice";
import { fetchFileDetails } from "../store/fileThunks";
import { buildFullPath } from "../utils/path";
import handleError from "../utils/error";
import { ensureMinimumDuration } from "../utils/timers";
import { FileInfo } from "../interfaces/fileInterfaces";
import {
  selectCurrentPath,
  selectLoadingFileId,
  selectSelectedFilePath,
} from "../store/selectors";
import type { AppDispatch } from "../store/store";
import { isRejected } from "@reduxjs/toolkit";

export const useExplorerController = () => {
  const dispatch = useDispatch<AppDispatch>();
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
    async (fullPath: string) => {
      if (selectedFilePath === fullPath && !loadingFileId) return;

      dispatch(selectFile(fullPath));

      try {
        const startTime = Date.now();
        const result = await dispatch(fetchFileDetails(fullPath));

        await ensureMinimumDuration(startTime);

        if (isRejected(result)) {
          throw new Error(result.payload || "Failed to fetch file");
        }

        const { path, details } = result.payload;

        dispatch(setFileDetails({ path, details }));
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
      }
    },
    [dispatch, selectedFilePath, loadingFileId]
  );

  const handleItemClick = useCallback(
    async (item: FileInfo) => {
      const fullPath = buildFullPath(currentPath, item.name);
      if (item.type === "file") {
        await handleFileClick(fullPath);
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
