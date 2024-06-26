import { connectMongo } from "@/lib/connection";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import  CredentialsProvider  from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"
import { NextAuthOptions } from "next-auth";

export const authOptions:NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name:"credentials",
            credentials:{},
            async authorize(credentials){
                const {email, password} = credentials as {email: string; password:string}
                try {
                    const res = await connectMongo()
                    const user = await User.findOne({email}) 

                    if(!user){
                        return null
                    }
                  const passwordMatch =  await bcrypt.compare(password, user.password)
                  if(!passwordMatch){
                    return null
                  }
                  return user
                } catch (error) {
                    console.log("Error:", error)
                }
            }
        }) 
    ],


    session:{
        strategy:"jwt",
        maxAge: 60 * 60,
        updateAge: 24 * 60 * 60, 
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/Errorpage",
    },
} 


const handler = NextAuth(authOptions)


export {handler as GET, handler as POST}