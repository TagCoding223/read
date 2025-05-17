import { randomUUID } from "crypto"
import { PrismaClient } from "../../../../generated/prisma"

export async function POST(req:Request) {
    const body = await req.json()
    console.log(body)
    const { name, email, phoneNumber, password, gender, avatar, bio, dob } = body

    const finalDob = dob ? new Date(dob).toISOString() : null;
    const id = randomUUID();
    const prisma = new PrismaClient()
    const userData: any = { id, name, email, phoneNumber, password, gender, avatar, bio };
    if (finalDob !== null) {
        userData.dob = finalDob;
    }
    const res = await prisma.user.create({
        data: userData
    })

    return Response.json(res)
}