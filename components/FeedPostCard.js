"use client";

import { UserContext } from "@/providers/UserContextProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { GoComment } from "react-icons/go";


import { FaHeart } from "react-icons/fa";
import CommentsCard from "./CommentsCard";
import { PostsContext } from "@/providers/PostsContextProvider";
import { useRouter } from "next/navigation";
import toast,{Toaster} from "react-hot-toast";


const FeedPostCard = ({post}) => {

  const router=useRouter();

  const { fetchAllPosts } = useContext(PostsContext);


  //console.log(post)
  const [showComment, setShowComment] = useState(false);
  const [comment,setComment]=useState("");
  const [postComments,setPostComments]=useState();
 // console.log(postComments)

  const [likeMessage, setLikeMessage] = useState();

  const { userData } = useContext(UserContext);

  // console.log(post?.comments)

  //fetch all comments in a post
  const getPostComments=async()=>{
    const payload={
      postID:post._id
    };
    //console.log(payload)
    try {
      const res=await axios.post("/api/posts/comments-for-post/",payload)
      //console.log(res.data);
      if(res.status){
        setPostComments(res?.data?.commentList?.comments);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(showComment){
      getPostComments();
    }
  }, [showComment])
  

  //to comment a post or view the others' comments
  const openComments=()=>{
    setShowComment(!showComment)
  }

  //comment to a post
  const handleComment=async()=>{
    const payload={
      postID:post._id,
      comment
    }
    try {
      const res=await axios.post("/api/posts/comment",payload)
      //console.log(res)
      if(res.status){
        setComment("");
        await fetchAllPosts();
        await getPostComments();
        toast.success("Comment Posted")
      }
    } catch (error) {
      console.log(error);
      toast.error("Comment Error")
    }
  }

  //like a post
  const handleLike = async () => {
    const payload = {
      postID: post._id,
    };
    //console.log(postID)
    try {
      const res = await axios.post("/api/posts/like", payload);
      if (res.status) {
        setLikeMessage(res?.data?.message);
        await fetchAllPosts();
        if(res.data.message=="Like"){
          toast('Disliked', {
            icon: '👎',
          });
        }else if(res.data.message=="Liked"){
          toast('Liked', {
            icon: '👍',
          });
        }

      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   console.log(likeMessage)
  // }, [likeMessage])
  

  return (
    <>
    <Toaster />
      <div className="w-full p-2 border shadow-lg flex flex-col gap-4">
        <div onClick={()=>router.push(`/profile/${post?.userID?._id}`)} className="flex items-center gap-2 cursor-pointer">
          <div>
            <img
              src={post?.userID?.profilePic}
              alt="profile image"
              className="w-10 h-10 rounded-full object-contain border"
            />
          </div>
          <div className="text-lg font-medium">
            {post?.userID?.fullname}
          </div>
        </div>
        <div className="">
          <img src={post?.photo} alt="" className="w-full h-[500px] object-contain" />
        </div>
        <div>{post?.caption}</div>
        <div className="flex items-center justify-between">

          {/* like count */}
          <div>
            {post?.likes.length ? post.likes.length + "likes" : "Be the first to like"}
          </div>

          {/* comment count */}
          <div>
            {post?.comments.length?post.comments.length+"comments":"No Comments"}
          </div>
        </div>
        <div className="border-t w-full" />

        {/* Like or Unlike a Post */}
        <div className="flex items-center justify-between">
          <div onClick={() => handleLike()} className="flex items-center gap-1 cursor-pointer">
            {post?.likes.includes(userData?._id) ? (
              <>
              <FaHeart className="w-10 h-10 text-pink-500" />
                <div className="font-medium">Liked</div>
              </>
            ) : (
              <>
                <>
                {likeMessage=="Liked"?(
                  <FaHeart className="w-10 h-10 text-pink-500" />
                ):(
                  <FaRegHeart className={`w-10 h-10 hover:text-pink-500 `} />
                )}
                </>
                <div>{likeMessage}</div>
              </>
            )}
          </div>
          <div
            onClick={() => openComments()}
            className="flex items-center gap-1 cursor-pointer"
          >
            <>
              <GoComment className="w-10 h-10 hover:text-pink-500" />
            </>
            <div className="font-medium">Comment</div>
          </div>
        </div>
        {showComment && (
          <>

          {/* send comment to post */}
            <div className="p-2 grid sm:grid-cols-12 gap-4">
              <div className="sm:col-span-10 flex items-center gap-1">
                <img
                  src={userData?.profilePic}
                  alt="profile image"
                  className="w-10 h-10 rounded-full object-contain border"
                />
                <input
                  type="text"
                  placeholder="write comment here..."
                  className="p-2 focus:outline-none border w-full"
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2 sm:flex sm:items-center sm:justify-center">
                <button onClick={()=>handleComment()} className="w-full sm:w-auto px-4 py-2 rounded-full font-medium bg-pink-500 hover:bg-violet-500 text-white">
                  Send
                </button>
              </div>
            </div>

            {/* list of comments in the post */}
            {post?.comments && postComments?.map((comment,i)=>{
              return(<CommentsCard key={i} comment={comment} />)
            })}
          </>
        )}
      </div>
    </>
  );
};

export default FeedPostCard;
