import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import champaignRouter from './routes/champaignRoutes.js'
import userRouter from './routes/userRoutes.js'


dotenv.config();

const app = express();

try {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("MongoDb is connected succesfully");
} catch (error) {
  console.log("error occured during Mongodb connection");
  
}


app.use(cookieParser())
app.use(express.json());

app.use('/api/champaign',champaignRouter)
app.use('/api/user',userRouter)


app.use((err, req, res, next) => {
  const statuscode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statuscode).json({
    success: false,
    statuscode,
    message,
  });
});

app.listen(8000, () => {
  console.log("server is running on port 8000");
});