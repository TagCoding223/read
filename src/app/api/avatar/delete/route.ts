import cloudinary from "@/config/cloudinary";

export async function POST(req:Request) {

    const formData = await req.formData();
    const public_id = formData.get("public_id");

    if (!public_id || typeof public_id !== "string") {
        return Response.json({ message: "public_id is required" }, { status: 400 });
    }else{

        try {
            // To delete an image from a specific directory, include the directory in the public_id.
            // For example, if your image is stored under "avatars/user123/avatar1", use that as the public_id.
            // Here, we assume public_id includes the directory path.
            const result = await cloudinary.uploader.destroy(public_id);
            // console.log(result)
            if (result.result==='ok') {
                return Response.json({message: "success",result},{status: 200})
            }else{
                return Response.json({message: "fail",result},{status: 200})
            }
        } catch (error) {
            const errorMessage = (error instanceof Error) ? error.message : String(error);
            return Response.json({ message: "Failed to delete image", error: errorMessage }, { status: 500 });
        }
    }

    
    // return Response.json({message: "success"},{status: 200})
}