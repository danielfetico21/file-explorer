import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectFilesState = createSelector(
  (state: RootState) => state.files,
  (filesState) => ({
    files: filesState.files,
    currentPath: filesState.currentPath,
    selectedFilePath: filesState.selectedFilePath,
    expandedFilePaths: filesState.expandedFilePaths,
    fileDetails: filesState.fileDetails,
    isLoading: filesState.isLoading,
    globalError: filesState.globalError,
    loadingFileId: filesState.loadingFileId,
  })
);

export const selectFiles = (state: RootState) => state.files.files;
export const selectCurrentPath = (state: RootState) => state.files.currentPath;
export const selectIsLoading = (state: RootState) => state.files.isLoading;
export const selectFileState = (state: RootState) => state.files;
export const selectSelectedFilePath = (state: RootState) =>
  state.files.selectedFilePath;
export const selectLoadingFileId = (state: RootState) =>
  state.files.loadingFileId;
export const selectFileDetailsByPath = (path: string) => (state: RootState) =>
  state.files.fileDetails[path];
export const selectIsLoadingFile = (fileId: string) => (state: RootState) =>
  state.files.loadingFileId === fileId;
