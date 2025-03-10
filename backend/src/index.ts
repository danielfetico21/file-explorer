import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import fileRoutes from './routes/fileRoutes';

const app: Application = express()
const PORT: number = parseInt(process.env.PORT || '3000', 10);

// Initialize middleware
app.use(cors())
app.use(express.json())

// Initialize routes
app.use('/api', fileRoutes)

// Initialize default route
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Server is running!" })
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default app