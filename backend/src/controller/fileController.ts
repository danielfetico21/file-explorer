import { Request, Response } from 'express';
import { getDirectoryContents, getFileDetails } from '../services/fileService';
import { 
    ERROR_PATH_REQUIRED, 
    ERROR_UNABLE_TO_LIST_FILES, 
    ERROR_UNABLE_TO_READ_FILE 
} from '../constants/error';


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

export async function getPlatform(req: Request, res: Response): Promise<void> {
    let platformName: string = process.platform === 'win32' ? 'Windows' : process.platform === 'darwin' ? 'MacOS' : process.platform === 'linux' ? 'Linux' : process.platform;
    res.json({ type: "success", platform: platformName });
}