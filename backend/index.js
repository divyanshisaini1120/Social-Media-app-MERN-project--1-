import express from "express"
import mongoose from "mongoose" 
import dotenv from "dotenv"


dotenv.config({path: "../.env"}) 

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

app.listen(port, ()=>
   console.log(`Server is running at ${port}`)
)
