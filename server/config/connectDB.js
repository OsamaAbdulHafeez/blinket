import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
if(!process.env.MONGODB_URL){
    throw new Error(
        "Please Provide Mongodb URL"
    )
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("ConnectDB")
    } catch (error) {
        console.log("mongo DB Coonection Error")
        process.exit(1)
    }
}

export default connectDB