import fs from 'fs/promises';
import path from 'path';
import { DirectoryItem, FileInfo } from '../interfaces/interface';
import { 
    ERROR_COULD_NOT_RETRIEVE_FILE_DETAILS, 
    ERROR_DIRECTORY_NOT_FOUND, 
    ERROR_FILE_NOT_FOUND, 
    ERROR_NOT_A_DIRECTORY, 
    ERROR_READING_DIRECTORY 
} from '../constants/error';


export async function pathExists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch (error: any) {
        return false;
    }
}

export async function isDirectory(filePath: string): Promise<boolean> {
    try {
        const stat = await fs.stat(filePath);
        return stat.isDirectory();
    } catch (error: any) {
        return false;
    }
}

export async function getDirectoryContents(dirPath: string): Promise<DirectoryItem[]> {
    const doesPathExist = await pathExists(dirPath);
    if (!doesPathExist) {
        throw new Error(ERROR_DIRECTORY_NOT_FOUND);
    }
  
    const isPathADirectory = await isDirectory(dirPath);
    if (!isPathADirectory) {
        throw new Error(ERROR_NOT_A_DIRECTORY);
    }
  
    try {
      const files = await fs.readdir(dirPath);
  
      const fileDetails = await Promise.all(
        files.map(async (fileName) => {
          const fullPath = path.join(dirPath, fileName);

          try {
            const stats = await fs.stat(fullPath);
            return {
              name: fileName,
              type: stats.isDirectory() ? 'directory' : 'file',
              size: stats.isFile() ? stats.size : null,
              createdAt: stats.birthtime,
              modifiedAt: stats.mtime,
            } as DirectoryItem;
          } catch (error: any) {
            return {
              name: fileName,
              error: ERROR_COULD_NOT_RETRIEVE_FILE_DETAILS,
              details: error.message,
            } as DirectoryItem;
          }
        })
      );
      return fileDetails;
    } catch (error: any) {
      throw new Error(`${ERROR_READING_DIRECTORY}: ${error.message}`);
    }
}

export async function getFileDetails(filePath: string): Promise<FileInfo> {
    const doesPathExist = await pathExists(filePath);
    if (!doesPathExist) {
        throw new Error(ERROR_FILE_NOT_FOUND);
    }

    try {
        const stats = await fs.stat(filePath)
        const fileDetails = {
            name: path.basename(filePath),
            type: stats.isDirectory() ? 'directory' : 'file',
            size: stats.size,
            createdAt: stats.birthtime,
            modifiedAt: stats.mtime
        }

        return fileDetails
    } catch (error: any) {
        throw new Error(error.message);
    }
}