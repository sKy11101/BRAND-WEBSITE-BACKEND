import express from "express";
import cors from "cors";
import { sendOTP } from "./controllers/otpController.js";
import { verifyAndSubmit } from "./controllers/surveyController.js";
const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173"
}));
app.use(express.json());
app.post("/api/otp/send", sendOTP);
app.post("/api/forms/verify-and-submit", verifyAndSubmit);
export default app;