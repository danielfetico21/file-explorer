import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DirectoryItem, FileInfo } from '../interfaces/fileInterfaces';


export interface FileState {
  currentPath: string
  files: DirectoryItem[]
  selectedFilePath: string | null
  expandedFilePaths: string[]
  fileDetails: Record<string, FileInfo>
  isLoading: boolean
  loadingFileId: string | null
}

const initialState : FileState = {
  currentPath: '/',
  files: [],
  selectedFilePath: null,
  expandedFilePaths: [],
  fileDetails: {},
  isLoading: false,
  loadingFileId: null
}


const fileSlice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    setFiles: (state: FileState, action: PayloadAction<DirectoryItem[]>) => {
      state.files = action.payload;
    },
    selectFile: (state: FileState, action: PayloadAction<string>) => {
      state.selectedFilePath = action.payload;
    },
    toggleFileExpansion: (state: FileState, action: PayloadAction<string>) => {
      const path = action.payload;
      if (state.expandedFilePaths.includes(path)) {
        state.expandedFilePaths = state.expandedFilePaths.filter(p => p !== path);
      } else {
        state.expandedFilePaths.push(path);
      }
    },
    setFileDetails: (state: FileState, action: PayloadAction<{path: string, details: FileInfo}>) => {
      const { path, details } = action.payload;
      state.fileDetails[path] = details;
    },
    setLoadingState: (state: FileState, action: PayloadAction<{isLoading: boolean, fileId?: string | null}>) => {
      const { isLoading, fileId } = action.payload;
      state.isLoading = isLoading;
      state.loadingFileId = fileId || null;
    },
    setCurrentPath: (state: FileState, action: PayloadAction<string>) => {
      state.currentPath = action.payload;
    }
  }
})

export const {
  setFiles,
  selectFile,
  toggleFileExpansion,
  setFileDetails,
  setLoadingState,
  setCurrentPath
} = fileSlice.actions;

export default fileSlice.reducer;