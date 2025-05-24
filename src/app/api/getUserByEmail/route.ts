import { prisma } from "@/lib/prisma"

export async function POST(req:Request){
    const formData = await req.formData()
    if (formData) {
        const email = formData.get("email") as string | null
        if (email) {
            
            const response = await prisma.user.findFirst({
                where: {email}
            })
            
            if(response){
                return Response.json({message: "User already exist with this email.", user: response},{status: 200})
            }else{
                return Response.json({message: "User not exist.", user: response},{status: 404})
            }
        }
        return Response.json({message: "Want email to getch user."},{status: 404})
    }else{
        return Response.json({message: "Want form data to getch user."},{status: 404})
    }
}