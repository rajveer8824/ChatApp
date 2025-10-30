import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import Path from "path";
import userRoute from './routes/user.route.js';
import messageRoute from './routes/message.route.js';
import { app, io, server } from './SocketIO/server.js';


dotenv.config();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:3002",
  credentials: true,
}));
app.use(cookieParser());

const PORT = process.env.PORT || 4000;
const URI = process.env.MONGODB_URI;

try{
    mongoose.connect(URI);
        console.log("Connected to MongoDB");
    }catch(error){
    console.log(error);
}


app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);

if(process.env.NODE_ENV === "production"){
const dirPath = Path.resolve();

app.use(express.static("./frontend/dist"));
app.get("*",(req,res) =>{
  res.sendFile(Path.resolve(dirPath, "./frontend/dist","index.html"))
})

}

server.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});