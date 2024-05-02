import { getDetailsFromToken } from "@/helpers/getUserDetailFromToken";
import uploadImage from "@/helpers/uploadImage";
import SocialUserModel from "@/libs/models/UserModel";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {

    const user = await getDetailsFromToken(req);
    //console.log(user._id);
    if (!user) {
      return NextResponse.json(
        { message: "Login first before updating profile pic" },
        { status: 404 }
      );
    }

    //console.log(req);

    const formData = await req.formData();
    // console.log("Profile Picture", formData);
    const profileID=formData.get("profileID");
    const profilePic=formData.get("profilePic");
    //console.log("Origin Photo",profilePic)
    //console.log(profileID)

    //check if logged in user id matches with the id who requests to update profile pic
    if(profileID!=user._id){
        return NextResponse.json({
            message:"Can't update profile pic as logged in user id does not match, please login first"
        },{
            status:404
        })
    }

    const profile=await SocialUserModel.findOne({_id:profileID})

    //check if the profile exists in database
    if(!profile){
        return NextResponse.json({
            message:"No user available in the database, Create an account first"
        },{
            status:404
        })
    }

    //console.log(profile)

    //upload profile pic to cloudinary
    let uploadedProfilePic="";
    if(profilePic?.name){
        uploadedProfilePic=await uploadImage(profilePic);
    }

    //console.log(uploadedProfilePic)

    //update profile pic
    profile.profilePic=uploadedProfilePic.url
    const updatedProfile=await profile.save();
    //console.log(updatedProfile)

    return NextResponse.json(
      { message: "ProfilePic Updated", },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "ProfilePic Update error:", error },
      {
        status: 500,
      }
    );
  }
}
