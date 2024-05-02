import SocialUserModel from "@/libs/models/UserModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import uploadImage from "@/helpers/uploadImage";


connectMongoDB();


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

        //upload photo to cloudinary
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