import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import SocialUserModel from "@/libs/models/UserModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


connectMongoDB();

export async function POST(req){
    try {
        const user=await getDetailsFromToken(req);
        if(!user){
            return NextResponse.json({message:"Please login first before viewing other profiles"},{status:404});
        }
        // console.log(user)
        const {personID}=await req.json();
        // console.log("Person ID",personID);

        const personData=await SocialUserModel.findOne({_id:personID}).select("-password");

        // console.log(personData);
        return NextResponse.json({message:"Profile Data Fetched",personData},{status:201});

    } catch (error) {
        return NextResponse.json({message:"Others Profile Fetching Error:",error},{status:500});
    }
}