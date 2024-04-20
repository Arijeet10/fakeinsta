"use client";

import { UserContext } from "@/providers/UserContextProvider";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FaRegComment, FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import CommentsCard from "./CommentsCard";

const url = process.env.NEXT_PUBLIC_ROOT_URL;

const PostCard = ({ post, fetchAllPosts }) => {
  // console.log(post)
  const [showComment, setShowComment] = useState(false);
  const [comment,setComment]=useState("");
  const [postComments,setPostComments]=useState();
  console.log(postComments)

  const [likeMessage, setLikeMessage] = useState("Like");

  const { userData } = useContext(UserContext);

  // console.log(post?.comments)

  //fetch all comments in a post
  const getPostComments=async()=>{
    const payload={
      postID:post._id
    };
    //console.log(payload)
    try {
      const res=await axios.post("/api/user/post/comments-for-post/",payload)
      console.log(res.data);
      if(res.status){
        setPostComments(res?.data?.commentList?.comments)
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
      const res=await axios.post(url+"/api/user/post/comment",payload)
      console.log(res)
      if(res.status){
        setComment("");
        fetchAllPosts();
        getPostComments();
      }
    } catch (error) {
      console.log(error);
    }
  }

  //like a post
  const handleLike = async () => {
    const payload = {
      postID: post._id,
    };
    //console.log(postID)
    try {
      const res = await axios.post(url + "api/user/post/like", payload);
      if (res.status) {
        setLikeMessage(res.data.message);
        fetchAllPosts();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full p-2 border shadow-lg flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div>
            <img
              src={post?.userID?.profilePic}
              alt="profile image"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div>{post?.userID?.fullname}</div>
            <div>{post?.userID?.username}</div>
          </div>
        </div>
        <div className="">
          <img src={post?.photo} alt="" className="w-full " />
        </div>
        <div className="flex items-center justify-between">
          {/* like count */}
          <div>
            {post?.likes?.length ? post.likes.length + "likes" : "0 likes"}
          </div>
          {/* comment count */}
          <div>
            {post?.comments?.length?post.comments.length+"comments":"0 comments"}
          </div>
        </div>
        <div className="border-t w-full" />
        <div className="flex items-center justify-between">
          <div onClick={() => handleLike()} className="flex items-center gap-1">
            {post?.likes?.includes(userData?._id) ? (
              <>
                <FaHeart className="w-10 h-10" />
                <div>Liked</div>
              </>
            ) : (
              <>
                <FaRegHeart className="w-10 h-10" />
                <div>{likeMessage}</div>
              </>
            )}
          </div>
          <div
            onClick={() => openComments()}
            className="flex items-center gap-1"
          >
            <>
              <FaRegComment className="w-10 h-10" />
            </>
            <div>Comment</div>
          </div>
        </div>
        {showComment && (
          <>
            <div className="p-2 grid sm:grid-cols-12 sm:gap-4">
              <div className="sm:col-span-2">
                <img
                  src={userData?.profilePic}
                  alt="profile image"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              <div className="sm:col-span-8">
                <input
                  type="text"
                  placeholder="write comment here..."
                  className="p-2 focus:outline-none border w-full"
                  value={comment}
                  onChange={(e)=>setComment(e.target.value)}
                />
              </div>
              <div className="sm:col-span-2 flex items-center justify-center">
                <button onClick={()=>handleComment()} className="px-4 py-2 rounded-full font-medium bg-pink-500 hover:bg-violet-500 text-white">
                  Send
                </button>
              </div>
            </div>
            {post?.comments && postComments?.map((comment,i)=>{
              return(<CommentsCard key={i} comment={comment} />)
            })}
          </>
        )}
      </div>
    </>
  );
};

export default PostCard;
