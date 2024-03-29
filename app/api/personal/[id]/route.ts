
import { connectMongo } from "@/lib/connection";
import PersonalInformation from "@/models/personalInformation";
import { NextResponse } from "next/server"
import { NextApiRequest } from "next";
export async function GET(req:NextApiRequest, {params}:any){
    const {id} = params // we grab id from link - desctructure
    await connectMongo();
   const adminInfo = await PersonalInformation.findById({_id:id})
   return NextResponse.json({adminInfo}, {status:200})
}