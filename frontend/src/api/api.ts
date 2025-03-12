import api from "../config/axiosConfig";
import { FileInfo, FileError, GetAllFilesResponse, GetPlatformResponse, GetFileApiResponse } from "../interfaces/fileInterfaces";

export async function getAllFiles(path: string): Promise<GetAllFilesResponse> {
  const { data } = await api.get<GetAllFilesResponse | FileError>("/files", {
    params: { path },
  });

  if (data.type === "error") {
    throw new Error(data.error ?? "Unknown server error");
  }

  return data;
}

export async function getFile(fileName: string): Promise<FileInfo> {
  const response = await api.get<GetFileApiResponse>("/file", {
    params: { path: fileName },
  });

  const data = response.data;
  if (data.type === "error") {
    // Throw instead of returning the error object
    // so that the caller's catch block is triggered
    throw new Error(data.error ?? "Unknown server error");
  }

  // If we get here, data.type === "success"
  return data.details;
}

export const getPlatform = async (): Promise<string> => {
  const response = await api.get<GetPlatformResponse>("/platform");
  return response.data.platform;
};