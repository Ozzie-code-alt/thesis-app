import { connectMongo } from "@/lib/connection";
import User from "@/models/user";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function POST(req:NextApiRequest){
    // we check if we have the same name in database
    try {
        await connectMongo()
        //@ts-ignore
    const {email} = await req.json() 

    const user = await User.findOne({email}).select("_id")
    console.log(user)
    return NextResponse.json({user})
    } catch (error) {
        console.log(error)
    }
}