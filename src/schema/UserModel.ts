import {z} from "zod"
const fileSchema = z
    .instanceof(File, { message: "Avatar must be a file." })
    .refine(file => file.size <= 5 * 1024 * 1024, { message: "Avatar file size must be 5MB or less." })
    .refine(file => ["image/jpeg", "image/png", "image/webp"].includes(file.type), { message: "Avatar must be a JPEG, PNG, or WEBP image." });


const phoneNumberSchemas: Record<string, z.ZodString> = {
    US: z.string({ required_error: "Phone number is required." })
        .regex(/^\d{10}$/, { message: "US phone number must be 10 digits." }),
    IN: z.string({ required_error: "Phone number is required." })
        .regex(/^[6-9]\d{9}$/, { message: "Indian phone number must be 10 digits starting with 6-9." }),
    UK: z.string({ required_error: "Phone number is required." })
        .regex(/^07\d{9}$/, { message: "UK phone number must start with 07 and be 11 digits." }),
    // Add more countries as needed
};

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
    country: z.enum(["US", "IN", "UK"], { required_error: "Country is required." }),
    phoneNumber: z.string({ required_error: "Phone number is required." }),
    password: z
        .string({ required_error: "Password is required." })
        .min(6, { message: "Password must be at least 6 characters." }),
    gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required." }),
    avatarMedia: fileSchema,
    avatarUrl: z
        .string({ required_error: "Avatar URL is required." })
        .url({ message: "Invalid URL format." }).optional(),
    bio: z
        .string({ required_error: "Bio is required." })
        .max(500, { message: "Bio must be 500 characters or less." }),
    dob: z
        .date({ required_error: "Date of birth is required." })
}).superRefine((data, ctx) => {
    const schema = phoneNumberSchemas[data.country];
    if (schema) {
        const result = schema.safeParse(data.phoneNumber);
        if (!result.success) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: result.error.errors[0].message,
                path: ["phoneNumber"],
            });
        }
    }
});
