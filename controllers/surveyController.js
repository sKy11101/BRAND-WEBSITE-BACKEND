import { verifyOTP } from "../services/otpService.js";
import { verifyAndSubmitSchema } from "../validators/surveySchema.js";

export function verifyAndSubmit(req, res) {
    const parsed = verifyAndSubmitSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            success: false,
            message: "Invalid survey data or OTP"
        });
    }

    const { otp, ...survey } = parsed.data;

    const result = verifyOTP(survey.phone, otp);

    if (!result.valid) {
        return res.status(400).json({
            success: false,
            message: result.message
        });
    }

    // No database: survey is validated, not persisted.
    return res.status(200).json({
        success: true,
        message: "OTP verified and survey accepted (not saved)"
    });
}