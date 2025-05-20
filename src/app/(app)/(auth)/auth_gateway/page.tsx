import type { Metadata } from 'next';
import AuthPage from './AuthPage';
export const metadata: Metadata = {
    title: "Sign Up | Blog Site",
    description: "Create a new account or sign in to your account.",
};

export default function Page(){
    return(
        <AuthPage />
    )
}