"use client";

import axios from "axios";
import { useContext, useRef, useState } from "react";
import { FaImage } from "react-icons/fa6";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import toast,{Toaster} from "react-hot-toast";
import { PostsContext } from "@/providers/PostsContextProvider";

const url=process.env.NEXT_PUBLIC_ROOT_URL

const NewPost = ({ userData, fetchCurrentUser }) => {


  const {fetchAllPosts}=useContext(PostsContext);

  // console.log(userData._id)
  const [postData, setPostData] = useState({
    caption: "",
    photo: "",
  });

  const [loading,setLoading]=useState(false);

  const uploadPhotoRef = useRef();

  const handleUpload = () => {
    uploadPhotoRef.current.click();
  };

  const handleShare = async() => {
    setLoading(true);
    console.log(postData);
    const formData=new FormData();
    formData.set("caption",postData.caption);
    formData.set("photo",postData.photo);
    // formData.set("userID",userData._id)
    try {
      const res=await axios.post(url+"api/posts/newpost/",formData);
      if(res.status){
        toast.success(res.data.message);
        //console.log(res.data.savedPost);
        setPostData({
          caption:"",
          photo:"",
        });
        fetchCurrentUser();
        fetchAllPosts();
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    } finally{
      setLoading(false);
    }
  };

  return (
    <>
      <div className="p-2 border border-black rounded-md shadow-lg">
        <Toaster />
        <div className="font-medium text-2xl">Create New Post</div>
        <div className="border-t w-full" />

        <div className="p-2 flex items-start gap-2 w-full">
          <img
            src={userData?.profilePic}
            alt="user photo"
            className="w-10 h-10 rounded-full"
          />
          <textarea
            type="text"
            rows="6"
            placeholder="write caption..."
            className="border w-full focus:outline-none p-2"
            value={postData.caption}
            onChange={(e) =>
              setPostData({ ...postData, caption: e.target.value })
            }
          />
        </div>
        <div className="p-2 flex items-center justify-between w-full">
          <div onClick={() => handleUpload()} className="">
            <input
              type="file"
              ref={uploadPhotoRef}
              className="hidden"
              required
              onChange={(e) =>
                setPostData({ ...postData, photo: e.target.files[0] })
              }
            />
            {Boolean(postData?.photo?.name) ? (
              <div className="flex items-center">
                <FaImage className="w-10 h-10" />
                {postData?.photo?.name}
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <FaImage className="w-10 h-10" />
                <div className="text-sm">Upload Photo</div>
              </div>
            )}
          </div>
          {loading?(
            <AiOutlineLoading3Quarters 
                className="w-10 h-10 text-violet-500"
            />
          ):(
            <button
            onClick={() => handleShare()}
            className="bg-pink-700 text-white font-medium hover:bg-violet-500 px-6 py-2 rounded-sm"
          >
            Share
          </button>
          )}
        </div>
      </div>
    </>
  );
};

export default NewPost;
