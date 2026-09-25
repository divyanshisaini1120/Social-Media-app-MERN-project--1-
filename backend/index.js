import express from "express"
import mongoose from "mongoose" 
import dotenv from "dotenv"
import UserRoutes from "./routes/UserRoutes.js"
import cookieParser from "cookie-parser"
import cors from "cors"


dotenv.config() 

let port  = 8084



const connectDB = async function(){
    try{
        const conn  = await mongoose.connect(process.env.dbURL) 
        console.log("DB connected")
    }catch(err){
        console.log(err.message)
    }
}
await connectDB()



const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: [
        "https://scaling-goldfish-7rvj4rvrxg42wq9r-5173.app.github.dev", 
        "https://scaling-goldfish-7rvj4rvrxg42wq9r-5173.app.github.dev/"
    ], 
    credentials: true 
}));

app.use("/user", UserRoutes)

app.listen(port, '0.0.0.0', ()=>
   console.log(`Server is running at ${port}`)
)
