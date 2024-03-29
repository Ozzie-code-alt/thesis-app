import { connectMongo } from "@/lib/connection";
import PersonalInformation from "@/models/personalInformation";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function POST(req:NextApiRequest){
    try {
        //@ts-ignore
        const {date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex, reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message} = await req.json(); 
        await connectMongo();
        await PersonalInformation.create({date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex ,reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message})
        console.log("Personal Information Sent")
        return NextResponse.json({message:"Personal Information Sent"}, {status:201})
    } catch (error) {
        return NextResponse.json({message:"An Error Occured While Sending Personal Informaton"},{status:500})
    }
}

export async function GET(){
        await connectMongo()
            const personalInfo = await PersonalInformation.find()
            console.log("Logg Personal Information",personalInfo)
            return NextResponse.json({personalInfo}) 
}