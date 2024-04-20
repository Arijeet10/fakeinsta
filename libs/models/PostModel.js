import mongoose,{Schema} from "mongoose";

const CommentSchema=new Schema({
    description:{
        type:String,
        default:""
    },
    userID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"socialusers"
    }
},{
    timestamps:true
})

const PostSchema=new Schema({
    userID:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:"socialusers"
    },
    caption:{
        type:String,
        default:""
    },
    photo:{
        type:String,
        default:"",
        required:[true,"upload photo"]
    },
    likes:{
        type:Array,
        default:[]
    },
    comments:[CommentSchema]
},{timestamps:true});

const UserPostModel=mongoose.models.UserPost||mongoose.model("UserPost",PostSchema);

export default UserPostModel;


