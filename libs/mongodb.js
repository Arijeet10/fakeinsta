import mongoose from "mongoose";

export const connectMongoDB=async()=>{
    if(mongoose.connections[0].readyState){
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB")
    } catch (error) {
        console.log("Can't connect to MongoDB, something went wrong:",error)
    }
}