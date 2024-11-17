import 'dotenv/config'
import connectDB from './config/db.js'
import express from 'express';
import cors from 'cors'
import userRouter from './routes/user.route.js';
import notesRouter from './routes/notes.route.js'
const app = express()
app.use(express.json())

const baseUrl = process.env.BASE_URL;
app.use(cors({ credentials: true, origin:baseUrl}))

app.use("/user",userRouter)
app.use("/notes",notesRouter)


connectDB().then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`server is running on ${process.env.PORT}`)
    })
})