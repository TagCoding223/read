import { prisma } from "@/lib/prisma"

export async function POST(req:Request){
    const body = await req.json()
    const id = body.id

    if(!id){
        return Response.json({success: false,message: "Provide correct credentials."},{status: 401})
    }

    const accountStatus = await prisma.userVerifyStatus.findUnique({where:{id: id}})

    if(accountStatus){
        return Response.json({success: true, message: "Successfully get user account status.", status: accountStatus},{status: 200})
    }

    return Response.json({success: false, message: "Record not found.", status: null},{status: 200})
}