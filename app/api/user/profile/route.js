const { connectMongoDB } = require("@/libs/mongodb");
import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import { NextResponse } from "next/server";


connectMongoDB();

export async function GET(req){
    try {
        const user=await getDetailsFromToken(req);
        //console.log(user);
        return NextResponse.json({message:"User Details fetched",user},{status:201});
    } catch (error) {
        return NextResponse.json({message:"Profile Error:",error},{status:500});
    }
}
