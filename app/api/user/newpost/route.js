import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import uploadImage from "@/helpers/uploadImage";
import UserPostModel from "@/libs/models/PostModel";
import { connectMongoDB } from "@/libs/mongodb";
import { NextResponse } from "next/server";


connectMongoDB();

export async function POST(req){
    try {
        const formData=await req.formData();
        const caption=formData.get("caption");
        const photo=formData.get("photo");
        const user=await getDetailsFromToken(req);
        // console.log(photo.name);
        if(!user){
            return NextResponse.json({message:"Can't post, please Login first"},{status:404});
        }
        let uploadedPhoto=""
        if(photo?.name){
            uploadedPhoto=await uploadImage(photo);
        }else{
            return NextResponse.json({message:"Invalid Photo"},{status:404});
        }
        //console.log(uploadedPhoto)
        const newPost=new UserPostModel({
            userID:user._id,
            caption,
            photo:uploadedPhoto.url,
        });
        //console.log(newPost)
        const savedPost=await newPost.save();
        return NextResponse.json({message:"Post Shared",savedPost},{status:201});
    } catch (error) {
        return NextResponse.json({message:"Post Error:",error},{status:500})
    }
}


