import { connectMongo } from "@/lib/connection";
import PersonalInformation from "@/models/personalInformation";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";


export async function POST(req:NextApiRequest){
    try {
        //@ts-ignore
        const {date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex, reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message , mean} = await req.json(); 
        await connectMongo();
        await PersonalInformation.create({date, userName, servicesReceived, externalClient, pointOfOrigin, officeVisited, internalClient, sex ,reliability,responsiveness,access,communication,costs,integrity,assurance,outcome, message , mean})
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
            const personalDateConverted = personalInfo.map(personalData => ({
                ...personalData._doc,
               date: personalData.date.toISOString().split("T")[0]
        }))
            return NextResponse.json({personalInfo:personalDateConverted}, {status:200}) 
}