import 'next-auth';
import { DefaultSession } from 'next-auth';

// custom fields define in next-auth user
declare module 'next-auth' {
    interface User {
        id?: string;
        name?: string;
        email?: string;
        avatarUrl?: string;
        isVerified?: boolean;
    }
    interface Session {
        user: {
            id?: string;
            name?: string;
            email?: string;
            avatarUrl?: string;
            isVerified?: boolean;
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        id?: string;
        name?: string;
        email?: string;
        avatarUrl?: string;
        isVerified?: boolean;
    }
}