import { Router } from 'express';
import { getFile, getFiles, getPlatform } from '../controller/fileController';

const router = Router();

router.get('/files', getFiles)
router.get('/file', getFile)
router.get('/platform', getPlatform)

export default router;  