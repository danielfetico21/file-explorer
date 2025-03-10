import { Request, Response } from 'express';
import { getDirectoryContents, getFileDetails } from '../services/fileService';
import { 
    ERROR_PATH_REQUIRED, 
    ERROR_UNABLE_TO_LIST_FILES, 
    ERROR_UNABLE_TO_READ_FILE 
} from '../constants/error';


/**
 * Retrieves a list of files and directories at the specified path
 * 
 * @function getFiles
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {string} req.query.path - Directory path to list contents from
 * @returns {Promise<void>} 
 * 
 * @example
 * // GET /files?path=/home/user/documents
 * // Response: { "type": "success", "contents": [...] }
 * 
 * @throws Will respond with 400 if path is not provided
 * @throws Will respond with 500 if directory contents cannot be retrieved
 */
export async function getFiles(req: Request, res: Response): Promise<void> {
    const dirPath: string = req.query.path as string;

    if (!dirPath) {
        res.status(400).json({ type: "error", message: ERROR_PATH_REQUIRED })
        return
    }

    try {
        const contents = await getDirectoryContents(dirPath);
        res.json({ type: "success", contents: contents });
    } catch (error) {
        res.status(500).json({ 
            type: "error", 
            message: ERROR_UNABLE_TO_LIST_FILES, 
            details: error instanceof Error ? error.message : String(error) 
        });
    }
}

/**
 * Retrieves detailed information about a specific file or directory
 * 
 * @function getFile
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {string} req.query.path - Path to the file or directory
 * @returns {Promise<void>}
 * 
 * @example
 * // GET /file?path=/home/user/documents/file.txt
 * // Response: { "type": "success", "details": {...} }
 * 
 * @throws Will respond with 400 if path is not provided
 * @throws Will respond with 500 if file details cannot be retrieved
 */
export async function getFile(req: Request, res: Response): Promise<void> {
    const filePath: string = req.query.path as string;

    if (!filePath) {
        res.status(400).json({ type: "error", message: ERROR_PATH_REQUIRED })
        return
    }

    try {
        const details = await getFileDetails(filePath);
        res.json({ type: "success", details: details });
    } catch (error) {
        res.status(500).json({ 
            type: "error", 
            message: ERROR_UNABLE_TO_READ_FILE, 
            details: error instanceof Error ? error.message : String(error) 
        });
    }
}

/**
 * Returns the current operating system platform name
 * 
 * @function getPlatform
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @returns {Promise<void>}
 * 
 * @example
 * // GET /platform
 * // Response: { "type": "success", "platform": "Windows" }
 */
export async function getPlatform(req: Request, res: Response): Promise<void> {
    let platformName: string = process.platform === 'win32' ? 'Windows' : process.platform === 'darwin' ? 'MacOS' : process.platform === 'linux' ? 'Linux' : process.platform;
    res.json({ type: "success", platform: platformName });
}