import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import { readdir, stat } from 'fs/promises'
import path from 'path';
import { Stats } from 'fs';


const app: Application = express()
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is running!" })
})

app.get("/api/files", async (req: Request, res: Response) => {
    const dirPath: string = req.query.path as string;

    if (!dirPath) {
        res.status(400).json({ message: "Path is required" })
        return
    }

    try {
        const fullPath: string = path.resolve(dirPath);
        const files: string[] = await readdir(fullPath);
        res.json({ path: dirPath, files: files })
    } catch (error) {
        console.error('Error reading directory:', error);
        res.status(500).json({ 
            error: 'Unable to list files', 
            details: error instanceof Error ? error.message : String(error) 
        });
    }
})

app.get("/api/file", async (req: Request, res: Response) => {
    const filePath:string = req.query.path as string;
    
    if (!filePath) {
        res.status(400).json({ message: "Path is required" })
        return
    }

    try {
        const fullPath: string = path.resolve(filePath);
        const getFileStats: Stats = await stat(fullPath);
        const fileStats = {
            name: path.basename(fullPath),
            type: getFileStats.isDirectory() ? 'directory' : 'file',
            size: getFileStats.size,
            creationDate: getFileStats.birthtime.toISOString(),
            lastModified: getFileStats.mtime.toISOString()
        }
        res.json({ path: filePath, file: fileStats })
    } catch (error) {
        console.error('Error reading file:', error);
        res.status(500).json({ 
            error: 'Unable to read file', 
            details: error instanceof Error ? error.message : String(error) 
        });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app