import * as React from "react";

interface VerificationEmailProps {
    userName?: string;
    verificationCode: string;
}

const VerificationEmail: React.FC<VerificationEmailProps> = ({
    userName,
    verificationCode,
}) => (
    <div
        style={{
            fontFamily: "Arial, sans-serif",
            background: "#f9f9f9",
            padding: "40px 0",
            minHeight: "100vh",
        }}
    >
        <table
            width="100%"
            cellPadding={0}
            cellSpacing={0}
            style={{ maxWidth: 480, margin: "0 auto", background: "#fff", borderRadius: 8, boxShadow: "0 2px 8px #eee" }}
        >
            <tbody>
                <tr>
                    <td style={{ padding: "32px 40px 24px 40px", textAlign: "center" }}>
                        <h2 style={{ color: "#222", margin: 0 }}>Verify Your Email</h2>
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "0 40px 24px 40px", color: "#444", fontSize: 16 }}>
                        {userName ? (
                            <p>Hi <strong>{userName}</strong>,</p>
                        ) : null}
                        <p>
                            Please use the verification code below to complete your sign up or verify your email address.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "0 40px 32px 40px", textAlign: "center" }}>
                        <div
                            style={{
                                display: "inline-block",
                                background: "#f0f4ff",
                                color: "#2a4cff",
                                fontWeight: "bold",
                                fontSize: 28,
                                letterSpacing: 6,
                                padding: "16px 32px",
                                borderRadius: 6,
                                margin: "16px 0",
                                fontFamily: "monospace",
                            }}
                        >
                            {verificationCode}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style={{ padding: "0 40px 32px 40px", color: "#888", fontSize: 14 }}>
                        <p>
                            If you did not request this, you can safely ignore this email.
                        </p>
                        <p style={{ marginTop: 24, color: "#bbb" }}>
                            &copy; {new Date().getFullYear()} Read
                        </p>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
);

export default VerificationEmail;