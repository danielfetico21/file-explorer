import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllFiles, getFile } from "../api/api";
import { FileInfo } from "../interfaces/fileInterfaces";

export const fetchDirectoryContents = createAsyncThunk<
  { path: string; contents: FileInfo[] },
  string,
  {
    rejectValue: string;
  }
>("files/fetchDirectoryContents", async (path, { rejectWithValue }) => {
  try {
    const res = await getAllFiles(path);
    return { path, contents: res.contents };
  } catch (err) {
    console.warn(err);
    return rejectWithValue("Failed to load directory");
  }
});

export const fetchFileDetails = createAsyncThunk<
  { path: string; details: FileInfo },
  string,
  { rejectValue: string }
>("files/fetchFileDetails", async (fullPath, { rejectWithValue }) => {
  try {
    const data = await getFile(fullPath);
    return { path: fullPath, details: data };
  } catch (err) {
    console.warn(err);
    return rejectWithValue("Failed to fetch file details");
  }
});
