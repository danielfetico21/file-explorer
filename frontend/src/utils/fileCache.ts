import { FileInfo } from "../interfaces/fileInterfaces";
import { storage } from "./storage";

const FILE_CACHE_KEY = "file_cache";

type FileCache = {
  [path: string]: {
    files: FileInfo[];
    updatedAt: number;
  };
};

export const fileCache = {
  get(path: string): FileInfo[] | null {
    const all = storage.get<FileCache>(FILE_CACHE_KEY);
    const entry = all?.[path];

    const isExpired = !entry || Date.now() - entry.updatedAt > 5 * 60 * 1000;

    return isExpired ? null : entry.files;
  },

  set(path: string, files: FileInfo[]) {
    const all = storage.get<FileCache>(FILE_CACHE_KEY) || {};
    all[path] = { files, updatedAt: Date.now() };
    storage.set(FILE_CACHE_KEY, all);
  },

  clear() {
    storage.remove(FILE_CACHE_KEY);
  },
};
