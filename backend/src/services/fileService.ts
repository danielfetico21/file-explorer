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

/**
 * Checks if a given file or directory path exists.
 *
 * @param {string} filePath - The path to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the path exists, otherwise false.
 */
export async function pathExists(filePath: string): Promise<boolean> {
    try {
        await fs.access(filePath);
        return true;
    } catch (error: any) {
        return false;
    }
}

/**
 * Determines if the given path is a directory.
 *
 * @param {string} filePath - The path to check.
 * @returns {Promise<boolean>} - A promise that resolves to true if the path is a directory, otherwise false.
 */
export async function isDirectory(filePath: string): Promise<boolean> {
    try {
        const stat = await fs.stat(filePath);
        return stat.isDirectory();
    } catch (error: any) {
        return false;
    }
}

/**
 * Retrieves the contents of a directory.
 *
 * This function checks whether the provided directory path exists and is indeed a directory.
 * It then reads the directory's contents and returns an array of DirectoryItem objects containing
 * details for each file or subdirectory. If details for an item cannot be retrieved, an error message
 * is included in that item's object.
 *
 * @param {string} dirPath - The directory path to list.
 * @returns {Promise<DirectoryItem[]>} - A promise that resolves to an array of directory items.
 * @throws Will throw an error if the directory does not exist, is not a directory, or if there's an error reading the directory.
 */
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

/**
 * Retrieves detailed information about a file or directory.
 *
 * This function checks if the specified file or directory exists. If it does, it returns an object containing
 * information such as name, type, size, creation date, and modification date.
 *
 * @param {string} filePath - The path to the file or directory.
 * @returns {Promise<FileInfo>} - A promise that resolves to an object containing the file or directory details.
 * @throws Will throw an error if the file or directory does not exist or if there is an error retrieving its details.
 */
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