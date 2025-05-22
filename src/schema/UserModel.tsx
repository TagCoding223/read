import {z} from "zod"

export const UserModel = z.object({
    id: z
        .string({ required_error: "ID is required." })
        .max(24, { message: "Maximum 24 characters allowed in id field." })
        .optional(),
    name: z
        .string({ required_error: "Name is required." })
        .min(2, { message: "Name cannot be empty (At least 2 character)." }),
    email: z
        .string({ required_error: "Email is required." })
        .email({ message: "Invalid email address." }),
    gender: z.enum(["Male", "Female", "Other"], { message: "Invalid value."}),
    password: z.string({required_error: "Password is required."}).min(6,"Password must be at least 6 characters.").max(100,"Maxmium 100 characters alow."),
    confirmPassword: z.string({required_error: "Password is required."}).min(6,"Password must be at least 6 characters.").max(100,"Maxmium 100 characters alow."),
    dob: z
        .coerce.date({ required_error: "Date of birth is required." }),
    phoneNumber: z.string({ required_error: "Phone number is required." }).min(6,"Enter a valid phone number"),
    address: z.string().max(150,"Address not larger than 150 characters.").optional(),
    bio: z
        .string({ required_error: "Bio is required." })
        .max(500, { message: "Bio must be 500 characters or less." }),
    avatarMedia: z
        .any()
        .refine(
            (file) =>
                !file ||
                (file instanceof File && file.size <= 1024 * 1024),
            { message: "Image must be less than 1MB." }
        )
        .optional(),
    captcha: z.string({required_error: "Captcha is required"})
})

