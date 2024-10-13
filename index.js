import router from "./routes/routes.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./utils/db.js";

dotenv.config({})

const app=express()
app.use(express.json())
app.use(cors())
app.use('/api/v2',router)
const port=8000

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})

connectDb()