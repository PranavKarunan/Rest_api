import express from "express";
import bodyParser from "body-parser";
import userRouter from './routes/userRouter.js'
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const app = express();

// middleware to print json data
app.use(express.json()); 

let PORT = process.env.PORT || 8080;
let URL = process.env.MONGOURL

// server configuration
app.listen(PORT, (err) => {
  try {
    if (err) {
      console.log("Server not connected due to ", err.message);
    } else {
      console.log(`Server connected on port ${PORT} successfully`);
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// database configuration
mongoose.set("strictQuery", false);
mongoose.connect(URL).then(()=>{
  console.log('Database connected successfully');
}).catch(err=>console.log(err))

// route configuration
app.use("/", userRouter);

