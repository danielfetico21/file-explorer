import express, { Request, Response }  from 'express'
import cors from 'cors'


const app = express()
const PORT: number = parseInt(process.env.PORT || '3000', 10);

app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message:"Server is running!" })
})

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})

export default app