import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import "dotenv/config";
import mongoose from "mongoose";
import dns from "dns";

import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

dns.setServers([
    "8.8.8.8",
    "8.8.4.4"
]);

const app = express();

const PORT =
    process.env.PORT || 8080;


// MIDDLEWARE

const allowedOrigins = [
    "http://localhost:5173",
    "https://sigmagpt-ibug.onrender.com"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

// ROUTES


app.use("/api", chatRoutes);

app.use(
    "/api/auth",
    authRoutes
);



// DATABASE

const connectDB = async () => {

    try {

        await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            "Connected with Database!"
        );

    } catch (error) {

        console.error(
            "Failed to connect with DB:",
            error
        );

    }
};


// SERVER

app.listen(
    PORT,
    () => {

        console.log(
            `Server running on ${PORT}`
        );

        connectDB();

    }
);