import { Router } from 'express';
import { getFile, getFiles, getPlatform } from '../controller/fileController';


/**
 * Express router for file management routes
 * @module routes/fileRoutes
 * 
 * This router handles endpoints related to file system operations:
 * - GET /files: Retrieve a list of files in a directory
 * - GET /file: Get details about a specific file
 * - GET /platform: Get information about the current operating system platform
 */

const router = Router();

/**
 * @route GET /files
 * @description Get a list of files from a specified directory
 * @query {string} [path] - Path to the directory (defaults to current directory if not specified)
 * @returns {Array<FileInfo>} Array of file information objects
 * @throws Will throw an error if the directory doesn't exist or cannot be accessed
 */
router.get('/files', getFiles)

/**
 * @route GET /file
 * @description Get detailed information about a specific file
 * @query {string} path - Path to the file
 * @returns {FileInfo} Detailed information about the requested file
 * @throws Will throw an error if the file doesn't exist or cannot be accessed
 */
router.get('/file', getFile)

/**
 * @route GET /platform
 * @description Get information about the current operating system platform
 * @returns {Object} Platform information including OS type, architecture, etc.
 */
router.get('/platform', getPlatform)

export default router;  