import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from "helmet"
import connectDB from "./config/connectDB.js"
import userRouter from './routes/user.route.js'
import categoryRouter from "./routes/category.route.js"
import uploadRouter from "./routes/uploadImage.js"
dotenv.config()
const app = express()
app.use(cors({
    credentials:true,
    origin:process.env.FRONTEND_URL
}))
app.use(cookieParser())
app.use(morgan())
app.use(express.json())
app.use(helmet({
    crossOriginResourcePolicy:false
}))

app.get('/',(req,res)=>{
    return res.json({
        message:"Hello World"
    })
})

app.use('/api/user',userRouter)
app.use('/api/category',categoryRouter)
app.use('/api/file',uploadRouter)

connectDB().then(()=>{
    app.listen(process.env.PORT,(req,res)=>{
        console.log('Server is runiing')
    })
})
