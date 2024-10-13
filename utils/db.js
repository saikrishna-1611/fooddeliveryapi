import mongoose from "mongoose";

const connectDb=async(req,res)=>{
    try{
      await mongoose.connect(process.env.MONGO_URL)
      console.log("connected to MongoDB");
    }
    catch(error){
      console.log(error.message)
    }
}

export default connectDb