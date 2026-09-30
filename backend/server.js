import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js"
import dns from "dns";
dns.setServers(["8.8.8.8", "8.8.4.4"]);


const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(cookieParser());

app.use("/api/auth",authRoutes);
app.use("/api",chatRoutes);


app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  connectDB();
});

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connect  with Database!");
    }catch(err){
        console.log("Failed to connect with DB",err);
    }
}