import mongoose,{Schema} from "mongoose";

const UserSchema=new Schema({
    fullname:{
        type:String,
        required:[true,"provide fullname"]
    },
    username:{
        type:String,
        unique:true,
        required:[true,"provide username"]
    },
    email:{
        type:String,
        unique:true,
        required:[true,"provide email"]
    },
    password:{
        type:String,
        required:[true,"provide password"]
    },
    profilePic:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    following:{
        type:Array,
        default:[]
    }

},{timestamps:true});

const SocialUserModel=mongoose.models.socialusers||mongoose.model("socialusers",UserSchema);
export default SocialUserModel;