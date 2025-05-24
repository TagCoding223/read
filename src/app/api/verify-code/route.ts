import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const id = formData.get("id") as string;
        const code = formData.get("code");

        if (!id || !code) {
            return Response.json({ success: false, message: "Missing id or code." }, { status: 400 });
        }

        const userStatus = await prisma.userVerifyStatus.findUnique({ where: { id } });

        if (!userStatus) {
            return Response.json({ success: false, message: "Invalid credentials." }, { status: 401 });
        }

        if (userStatus.isVerified) {
            return Response.json({ success: true, message: "User account is already verified." }, { status: 200 });
        }

        if (new Date(userStatus.verificationCodeExpiry) <= new Date()) {
            return Response.json({ success: false, message: "Code already expired." }, { status: 410 });
        }

        if (userStatus.verificationCode !== code) {
            return Response.json({ success: false, message: "User account verification failed." }, { status: 401 });
        }

        // Update the user as verified here
        await prisma.userVerifyStatus.update({ where: { id }, data: { isVerified: true } });

        return Response.json({ success: true, message: "User account verification done." }, { status: 200 });

    } catch (error) {
        return Response.json({ success: false, message: "Something went wrong, try again.", error: error instanceof Error ? error.message : error }, { status: 500 });
    }
}