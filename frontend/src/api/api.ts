import api from "../config/axiosConfig";
import { DirectoryItem, FileInfo, GetAllFilesResponse, GetFileResponse, GetPlatformResponse } from "../interfaces/fileInterfaces";

export const getAllFiles = async (dirPath: string): Promise<DirectoryItem[]> => {
  const response = await api.get<GetAllFilesResponse>("/files", {
    params: { path: dirPath },
  });
  return response.data.contents;
};

export const getFile = async (fileName: string): Promise<FileInfo> => {
  const response = await api.get<GetFileResponse>("/file", {
    params: { path: fileName },
  });
  return response.data.details;
};

export const getPlatform = async (): Promise<string> => {
  const response = await api.get<GetPlatformResponse>("/platform");
  return response.data.platform;
};