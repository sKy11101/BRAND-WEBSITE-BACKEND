import { generateOTP } from "../services/otpService.js";
import { sendOTPSchema } from "../validators/surveySchema.js";

export function sendOTP(req, res) {
    const parsed = sendOTPSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid phone number"
        });
    }

    const { phoneNumber } = parsed.data;
    const otp = generateOTP(phoneNumber);

    console.log(`LOCAL DEVELOPMENT OTP for ${phoneNumber}: ${otp}`);

    return res.status(200).json({
        success: true,
        message: "Development OTP generated. Check backend terminal."
    });
}