import { NextResponse } from "next/server";

export async function GET(){
    try {

        const response=NextResponse.json({message:"Successfully Logged Out",success:true},{status:201});
        // remove cookies
        response.cookies.set("token","",{httpOnly:true,expires:new Date(0)});
        return response;
        
    } catch (error) {
        return NextResponse.json({message:"Logout Error:",error},{status:500});
    }
}