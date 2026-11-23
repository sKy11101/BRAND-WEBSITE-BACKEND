import crypto from "node:crypto";

const otpStore = new Map();

const TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

export function generateOTP(phoneNumber) {
    const otp = crypto.randomInt(0, 1000000)
        .toString()
        .padStart(6, "0");

    otpStore.set(phoneNumber, {
        otp,
        expiresAt: Date.now() + TTL_MS,
        attempts: 0
    });

    return otp;
}

export function verifyOTP(phoneNumber, suppliedOTP) {
    const record = otpStore.get(phoneNumber);

    if (!record) {
        return {
            valid: false,
            message: "OTP not found"
        };
    }

    if (Date.now() >= record.expiresAt) {
        otpStore.delete(phoneNumber);

        return {
            valid: false,
            message: "OTP expired"
        };
    }

    if (record.attempts >= MAX_ATTEMPTS) {
        otpStore.delete(phoneNumber);

        return {
            valid: false,
            message: "Maximum attempts exceeded"
        };
    }

    if (!/^\d{6}$/.test(suppliedOTP)) {
        return {
            valid: false,
            message: "Invalid OTP format"
        };
    }

    record.attempts += 1;

    const valid = crypto.timingSafeEqual(
        Buffer.from(record.otp),
        Buffer.from(suppliedOTP)
    );

    if (!valid) {
        if (record.attempts >= MAX_ATTEMPTS) {
            otpStore.delete(phoneNumber);
        }

        return {
            valid: false,
            message: "Invalid OTP"
        };
    }

    otpStore.delete(phoneNumber);

    return {
        valid: true
    };
}