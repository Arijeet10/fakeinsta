import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import SocialUserModel from "@/libs/models/UserModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


connectMongoDB();

export async function GET(req){
    try {
        const user=await getDetailsFromToken(req);
        if(!user){
            return NextResponse.json({message:"Please Login first!"},{status:404});
        }
        const people=await SocialUserModel.find({_id:{$ne:user._id}}).select("-password");
        //console.log(people)
        return NextResponse.json({message:"Found People",people},{status:201});
    } catch (error) {
        return NextResponse.json({message:"Find People Error:",error},{status:500});
    }
}