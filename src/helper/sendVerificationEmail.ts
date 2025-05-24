import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

interface ApiResponse {
    success: boolean;
    message: string;
}

export async function sendVerificationEmail(
    email: string,
    userName: string,
    verifyCode: string
): Promise<ApiResponse> {
    try {

        const fromEmail = process.env.FORM_EMAIL_ID;
        if (!fromEmail) {
            throw new Error("FORM_EMAIL_ID environment variable is not set.");
        }
        
        const res = await resend.emails.send({
            from: fromEmail,
            to: email,
            subject: "Verification code.",
            react: await VerificationEmail({ userName, verificationCode: verifyCode }),
        });

        console.log(res)

        if (res.error===null) {
            return {
                success: true,
                message: "Verification email send successfully.",
            }
        }

        return {
            success: false,
            message: "Failed to send verification email.",
        }
    } catch (emailError) {
        console.log("Error sending verification email, due to: ", emailError);
        return {
            success: false,
            message: "Failed to send verification email.",
        }
    }
}