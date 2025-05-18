import { randomUUID } from "crypto"
import ObjectID from "bson-objectid";
import { PrismaClient } from "../../../../generated/prisma"

const getId = async (): Promise<ObjectID> => {
    return await ObjectID()
}

export async function POST(req:Request) {
    const body = await req.json()
    console.log(body)
    const { name, email, phoneNumber, password, gender, avatar, bio, dob } = body

    const finalDob = dob ? new Date(dob).toISOString() : null;
    // const id = randomUUID();
    const id = await getId()
    console.log("id: ",id)
    const prisma = new PrismaClient()
    const userData: any = { id, name, email, phoneNumber, password, gender, avatar, bio }; // use for mongodb and mysql both
    if (finalDob !== null) {
        userData.dob = finalDob;
    }
    const res = await prisma.user.create({
        data: userData
    })

    return Response.json(res)
}