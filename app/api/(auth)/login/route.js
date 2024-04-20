import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connectMongoDB } from "@/libs/mongodb";
import SocialUserModel from "@/libs/models/UserModel";
import jwt from "jsonwebtoken";

connectMongoDB();

//exporting OPTIONS async function in routes handler 
export async function OPTIONS(request) {
    const allowedOrigin = request.headers.get("origin");
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin || "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
  
    return response;
  }

export async function POST(req){
    try {
        const formData=await req.formData();
        //console.log(formData)
        const email=formData.get("email");
        const password=formData.get("password");
        const user=await SocialUserModel.findOne({email});
        // console.log(user.password)
        // console.log(password)
        if(!user){
            return NextResponse.json({message:"Account doesn't exist"},{status:404});
        }
        const verifyPassword=await bcryptjs.compare(password,user.password);
        // console.log(verifyPassword)
        if(verifyPassword){
            const tokenData={
                id:user._id
            };
            const token=await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn:"1d"});
            const response=NextResponse.json({
                token:token,
                message:"Login Successful",
                success:true
            });
            const cookiesOption={
                httpOnly:true,
                secure:true
            };
            response.cookies.set("token",token,cookiesOption);
            return response;
            
        }
    } catch (error) {
        return NextResponse.json({message:"Login Error:",error},{status:500});
    }
}
