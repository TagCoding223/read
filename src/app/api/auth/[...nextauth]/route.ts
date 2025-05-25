import NextAuth, { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const authOptions:NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {


                const email = credentials?.email as string
                const password = credentials?.password as string

                if (!email && !password) {
                    // return Response.json({success: false,message: "Please provide credentials."},{status: 401})
                    throw new Error("Please provide credentials.")
                }

                const formData = new FormData()
                formData.append("email", email)

                const userRes = await fetch(`${process.env.BASE_URL}api/getUserByEmail`, {
                    method: "POST",
                    body: formData
                }).then(res => {
                    return res.json()
                })

                if (userRes.user===null && userRes) {
                    throw new Error("User not found.")
                }

                const isPasswordCorrect = await bcrypt.compare(password, userRes.user.password)
                if(!isPasswordCorrect){
                    throw new Error("Invaild credentials.")
                }

                const userStatus = await fetch(`${process.env.BASE_URL}api/getAccountStatus`,{
                    method: "POST",
                    body: JSON.stringify({id: userRes.user.id})
                }).then(res => {
                    return res.json()
                })

                // if(!userStatus.status.isVerified && userStatus){
                //     throw new Error("Account not verified.")
                // }

                if (userRes.user) {
                    return {
                        id: userRes.user.id,
                        email: userRes.user.email,
                        name: userRes.user.name,
                        avatarUrl: userRes.user.avatarUrl,
                        isVerified: userStatus.status.isVerified
                    }
                }

                return null
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: "jwt"
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
                token.name = user.name
                token.email = user.email
                token.avatarUrl = user.avatarUrl
                token.isVerified = user.isVerified
            }
            return token
        },

        async session({ session, token}) {
            
            if (token) {
                // try to recall token callback slightly to fetch updated user data

                session.user.id = token.id
                session.user.name = token.name
                session.user.email = token.email
                session.user.avatarUrl = token.avatarUrl
                session.user.isVerified = token.isVerified

            }
            
            return session
        }
    }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }