export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

// type User = {
//     id?: string;
//     name: string;
//     email: string;
//     phoneNumber: string;
//     password: string;
//     gender: Gender;
//     avatar: string;
//     bio: string;
//     dob: Date;
//     avatarMedia: File;
//     captcha: string;
//     confirmPassword: string;
// };

type User = {
    name: string;
    email: string;
    gender: "Male" | "Female" | "Other";
    password: string;
    confirmPassword: string;
    dob: Date;
    phoneNumber: string;
    bio: string;
    captcha: string;
    id?: string;
    address?: string;
    avatarMedia?: File;
}
export type { User }