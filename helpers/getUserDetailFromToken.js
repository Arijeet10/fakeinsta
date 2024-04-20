import SocialUserModel from "@/libs/models/UserModel";
import jwt from "jsonwebtoken";

const { connectMongoDB } = require("@/libs/mongodb");


connectMongoDB();
export const getDetailsFromToken=async(request)=>{
    try {
        const token=request.cookies.get("token")?.value||"";
        if(token){
            const userData = await jwt.verify(token,process.env.TOKEN_SECRET)

            const user = await SocialUserModel.findOne({ _id : userData.id }).select("-password")
            //console.log(user)
            return user
        }
        return token
    } catch (error) {
        return error;
    }
}