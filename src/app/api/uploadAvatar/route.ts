import cloudinary from "@/config/cloudinary";
import type { UploadApiResponse } from "cloudinary";

export async function POST(req: Request) {

    const formData = await req.formData();
    console.log(formData)
    const avatar = formData.get('avatar') as File | null;
    if (!avatar) {
        return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await avatar.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uniqueFilename = `avatar_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    // console.log(uniqueFilename)

    try {

        const result = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                {
                    folder: "read/avatars",
                    public_id: uniqueFilename,
                    resource_type: "image",
                    transformation:{
                        width: "150",
                        height: "150"
                    }
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else if (result) {
                        resolve(result);
                    } else {
                        reject(new Error("No result returned from Cloudinary"));
                    }
                }
            ).end(buffer);
        });

        // console.log(result)

        return Response.json({ url: result.secure_url, public_key: result.public_id }, { status: 200 });
    } catch (error) {
        return Response.json({ error: "Upload failed", details: error }, { status: 500 });
    }
}

// {
//   asset_id: '679eb6541e13efa98769c94a6ad2da6a',
//   public_id: 'read/avatars/avatar_1747920012057_2zbvvwrf',
//   version: 1747920016,
//   version_id: '4238ed5b28abb2da4a086b910afb83c5',
//   signature: '3a051b1450717ac0ad6fa30489251af9756226fe',
//   width: 1920,
//   height: 1328,
//   format: 'png',
//   resource_type: 'image',
//   created_at: '2025-05-22T13:20:16Z',
//   tags: [],
//   bytes: 330875,
//   type: 'upload',
//   etag: '',
//   placeholder: false,
//   url: 'http://res.cloudinary.com/dcvg6aj9u/image/upload/v1747920016/read/avatars/avatar_1747920012057_2zbvvwrf.png',
//   secure_url: 'https://res.cloudinary.com/dcvg6aj9u/image/upload/v1747920016/read/avatars/avatar_1747920012057_2zbvvwrf.png',      
//   asset_folder: 'read/avatars',
//   display_name: 'avatar_1747920012057_2zbvvwrf',
//   original_filename: 'file',
//   api_key: ''
// }