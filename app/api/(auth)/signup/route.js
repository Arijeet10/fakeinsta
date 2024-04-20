import SocialUserModel from "@/libs/models/UserModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import uploadImage from "@/helpers/uploadImage";


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
        const fullname=formData.get("fullname");
        const username=formData.get("username");
        const email=formData.get("email");
        const password=formData.get("password");
        const profilePic=formData.get("profilePic");
        // check email exists or not
        let user=await SocialUserModel.findOne({email});
        if(user){
            return NextResponse.json({message:"Email is already registered"},{status:404});
        }
        // check for same username
        user=await SocialUserModel.findOne({username});
        if(user){
            return NextResponse.json({message:"Username is already taken"},{status:404});
        }
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);
        let uploadedProfilePic="";
        if(profilePic?.name){
            uploadedProfilePic=await uploadImage(profilePic);
        }
        const newUser=new SocialUserModel({
            fullname,
            username,
            email,
            password:hashedPassword,
            profilePic:uploadedProfilePic.url,
        });
        const savedNewUser=await newUser.save();
        return NextResponse.json({message:"Account Created:",savedNewUser},{status:201});

    } catch (error) {
        return NextResponse.json({message:"Error in registering user:",error},{status:500})
    }
}