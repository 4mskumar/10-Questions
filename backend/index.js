import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./service/db.js";
import aiChatRoute from "./routes/aiChatRoute.js";

const app = express();
config()
app.use(express.json());
app.use(cors())

app.use('/api', aiChatRoute)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    connectDB()
})