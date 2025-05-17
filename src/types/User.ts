export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
}

type User = {
    id?: string;
    name: string;
    email: string;
    phoneNumber: string;
    password: string;
    gender: Gender;
    avatar: string;
    bio: string;
    dob: Date;
};
export type {User}