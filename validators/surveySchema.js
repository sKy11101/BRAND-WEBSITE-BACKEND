import { z } from "zod";
const phoneSchema = z.string().regex(/^\+[1-9]\d{7,14}$/);
export const sendOTPSchema = z.object({
    phoneNumber: phoneSchema
}).strict();
export const verifyAndSubmitSchema = z.object({
    name: z.string().trim().min(3).max(150),
    city: z.string().trim().min(3).max(100),
    state: z.string().trim().min(2).max(100),
    phone: phoneSchema,
    mail: z.email().max(255),
    otp: z.string().regex(/^\d{6}$/)
}).strict();