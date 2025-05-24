import ObjectID from "bson-objectid";
import { PrismaClient } from "../../../../generated/prisma"
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";

const getId = async (): Promise<string> => {
    // Generate a random 24-character hash code (alphanumeric)
    // const id = Array.from({ length: 24 }, () =>
    //     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    //         .charAt(Math.floor(Math.random() * 62))
    // ).join("");
    return ObjectID().toHexString();
}

export async function POST(req: Request) {
    const formData = await req.formData()

    console.log(formData)

    if (formData) {
        const prisma = new PrismaClient()

        const email = (formData.get("email") as string) || ''

        // // check user already exist or not (not use findUnique because it is work for id's)
        // try {
        //     const existingUser = await prisma.user.findFirst({
        //         where: { email }
        //     });
        //     if (existingUser) {
        //         return Response.json({ message: "User already exists with this email.", user: existingUser }, { status: 400 });
        //     }
        // } catch (error) {
        //     return Response.json({message: "Something gone wrong!, please try again.",error},{status: 500})
        // }

        const name = (formData.get("name") as string) || ''
        const phoneNumber = (formData.get("phoneNumber") as string) || ''
        const password = (formData.get("password") as string) || ''
        const gender = (formData.get("gender") as string) || ''
        const avatarUrl = (formData.get("avatarUrl") as string) || ''
        const avatarPublicId = (formData.get("avatarPublicId") as string) || ''
        const bio = (formData.get("bio") as string) || ''
        const dobEntry = formData.get("dob");
        let dob: string | null = null;
        if (typeof dobEntry === "string" && dobEntry.trim() !== "") {
            dob = new Date(dobEntry).toISOString();
        }

        // const id = randomUUID();
        const id = await getId()
        // console.log("id: ", id)

        const hashedPassword = await bcrypt.hash(password, 10)
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const verificationCodeExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();

        const userData = {
            id,
            name,
            email,
            phoneNumber,
            password: hashedPassword,
            gender,
            avatarUrl,
            avatarPublicId,
            bio,
            dob,
            userVerifyStatus: {
                create: {
                    verificationCode,
                    verificationCodeExpiry,
                    isVerified: false
                }
            }
        };

        // create user
        try {
            const userRes = await prisma.user.create({
                data: userData,
                include: {
                    userVerifyStatus: true,
                }
            })

            // send email
            const emailRes = await sendVerificationEmail(email,name,verificationCode);

            return Response.json({ message: "User registred successfully.", userRes, emailRes }, { status: 201 })
        } catch (error) {
            return Response.json({ message: "User registration failed.", error }, { status: 500 })
        }

    } else {
        return Response.json({ message: "Required fields to create user." }, { status: 400 })
    }

}