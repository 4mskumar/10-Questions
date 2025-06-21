import express from "express";
import { getRevert } from "../controller/aiController.js";

const router = express.Router() 

router.post('/chat', getRevert)

export default router;