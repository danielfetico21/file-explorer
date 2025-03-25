import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FileError, FileInfo } from "../interfaces/fileInterfaces";
import { fetchDirectoryContents, fetchFileDetails } from "./fileThunks";

export interface FileState {
  currentPath: string;
  files: FileInfo[];
  selectedFilePath: string | null;
  expandedFilePaths: string[];
  fileDetails: Record<string, FileInfo>;
  isLoading: boolean;
  loadingFileId: string | null;
  globalError: FileError | null;
}

const initialState: FileState = {
  currentPath: "/",
  files: [],
  selectedFilePath: null,
  expandedFilePaths: [],
  fileDetails: {},
  isLoading: false,
  loadingFileId: null,
  globalError: null,
};

const fileSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setFiles: (state: FileState, action: PayloadAction<FileInfo[]>) => {
      state.files = action.payload;
    },

    selectFile: (state: FileState, action: PayloadAction<string>) => {
      state.selectedFilePath = action.payload;
    },

    toggleFileExpansion: (state: FileState, action: PayloadAction<string>) => {
      const path = action.payload;
      if (state.expandedFilePaths.includes(path)) {
        state.expandedFilePaths = state.expandedFilePaths.filter(
          (p) => p !== path
        );
      } else {
        state.expandedFilePaths.push(path);
      }
    },

    setFileDetails: (
      state: FileState,
      action: PayloadAction<{ path: string; details: FileInfo }>
    ) => {
      const { path, details } = action.payload;
      state.fileDetails[path] = details;
    },

    setLoadingState: (
      state: FileState,
      action: PayloadAction<{ isLoading: boolean; fileId?: string | null }>
    ) => {
      const { isLoading, fileId } = action.payload;
      state.isLoading = isLoading;
      state.loadingFileId = fileId || null;
    },

    setCurrentPath: (state: FileState, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    },

    setGlobalError(state, action: PayloadAction<FileError | null>) {
      state.globalError = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDirectoryContents.pending, (state) => {
        state.isLoading = true;
        state.globalError = null;
      })
      .addCase(fetchDirectoryContents.fulfilled, (state, action) => {
        const { contents } = action.payload;
        state.files = contents;
        state.isLoading = false;
        state.globalError = null;
      })
      .addCase(fetchDirectoryContents.rejected, (state, action) => {
        state.isLoading = false;
        state.globalError = {
          type: "error",
          error: action.payload || "Failed to load directory",
          details: "",
        };
      });

    builder
      .addCase(fetchFileDetails.pending, (state, action) => {
        const filePath = action.meta.arg;
        const fileName = filePath.split("/").pop() || "";
        state.isLoading = true;
        state.loadingFileId = fileName;
      })
      .addCase(fetchFileDetails.fulfilled, (state, action) => {
        const { path, details } = action.payload;
        state.fileDetails[path] = details;
        state.isLoading = false;
        state.loadingFileId = null;
      })
      .addCase(fetchFileDetails.rejected, (state) => {
        state.isLoading = false;
        state.loadingFileId = null;
      });
  },
});

export const {
  setFiles,
  selectFile,
  toggleFileExpansion,
  setFileDetails,
  setLoadingState,
  setCurrentPath,
  setGlobalError,
} = fileSlice.actions;

export default fileSlice.reducer;
