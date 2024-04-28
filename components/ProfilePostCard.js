"use client";

import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdEdit } from "react-icons/md";

import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/providers/UserContextProvider";
import { deletePost, editPost } from "@/helpers/request";
import toast, { Toaster } from "react-hot-toast";
import { PostsContext } from "@/providers/PostsContextProvider";
import { IoIosClose } from "react-icons/io";

const ProfilePostCard = ({ post, handlePostModal, setBgDarkEffect, closeBackgroundDarkEffect, confirmDelete, setConfirmDelete, editModal, setEditModal }) => {
  const [modal, setModal] = useState(false);
  const [caption, setCaption] = useState();
  const { userData } = useContext(UserContext);
  const { fetchAllPosts } = useContext(PostsContext);

  //save new caption for post
  const handleSaveCaption=async(postID)=>{
    //console.log(caption);
    const payload={
      postID,
      caption,
    }
    try {
      const res=await editPost(payload);
      if(res){
        await fetchAllPosts();
        toast.success(res.message);
        setEditModal(false);
        closeBackgroundDarkEffect();
        setCaption("");
      }
    } catch (error) {
      console.log(error)
      toast.error("Edit Caption Error");
    }
  }

  //open Edit Caption popup
  const openEditCaption = () => {
    setBgDarkEffect(true);
    setEditModal(true);
    setModal(false);
  };



  //open delete confirmation popup
  const openConfirmDelete = () => {
    setConfirmDelete(true);
    setModal(false);
    setBgDarkEffect(true);
  };

  //to delete your post
  const handleDeletePost = async (postID) => {
    //console.log(postID);
    try {
      const res = await deletePost(postID);
      toast.success(res);
      await fetchAllPosts();
      setConfirmDelete(false);
      closeBackgroundDarkEffect();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="relative border shadow-sm rounded-sm">
        <Toaster />

        {/* get edit delete options if for logged in user only */}
        {userData?._id === post?.userID && (
          <div className="relative flex items-center justify-end">
            <BsThreeDotsVertical
              onClick={() => setModal(!modal)}
              className="w-5 h-5 hover:text-pink-500"
            />
            {modal && (
              <>
                <div className=" absolute top-5 right-2 z-50 bg-white   border rounded-lg shadow-md cursor-pointer">
                  <div
                    onClick={() => openEditCaption()}
                    className="p-2 flex items-center justify-between hover:text-indigo-500"
                  >
                    <div>Edit</div>
                    <MdEdit className="w-8 h-8 " />
                  </div>
                  <div
                    onClick={() => openConfirmDelete()}
                    className="p-2 flex items-center justify-between hover:text-red-500"
                  >
                    <div>Delete</div>
                    <MdDelete className="w-8 h-8 " />
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Post Image */}
        <img
          onClick={() => handlePostModal(post.photo)}
          src={post.photo}
          alt="post image"
          className="object-contain w-full rounded-sm sm:w-[600px] h-[500px]"
        />

        {/* Post Caption */}
        <div>{post?.caption}</div>

      </div>

        {/* Edit Caption popup */}
        {editModal && (
          <>
            <div className="p-4 w-full sm:w-[300px] border rounded-md fixed top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] z-50 bg-white shadow-md">
              <div>
                <textarea
                  rows="4"
                  type="text"
                  placeholder={`${post?.caption || ""}`}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="border focus:outline-none w-full  p-2"
                />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={()=>handleSaveCaption(post?._id)} className="bg-pink-700 text-white font-medium hover:bg-violet-500 px-6 py-2 rounded-md">
                  Save
                </button>
                <button onClick={()=>closeBackgroundDarkEffect()} className="bg-pink-700 text-white font-medium hover:bg-violet-500 px-6 py-2 rounded-md">
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}


      {/* delete confirm message popup */}
      {confirmDelete && (
        <>
          <div className="w-full sm:w-[500px] p-2 rounded-sm fixed bg-white z-50 top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] ">

            <div className="py-2 flex items-center justify-between">

            <div className=" text-xl font-semibold">
              Confirm Delete Post?
            </div>

            <div>
            <IoIosClose
                onClick={() => closeBackgroundDarkEffect()}
                className="h-10 w-10 hover:text-red-500"
              />

            </div>
            </div>

            <div className="py-4 font-medium flex items-center justify-end gap-4">
              <button
                onClick={() => handleDeletePost(post?._id)}
                className="px-4 py-2 rounded-lg border bg-pink-500 text-white hover:bg-violet-500"
              >
                Yes
              </button>
              <button
                onClick={() => closeBackgroundDarkEffect()}
                className="px-4 py-2 rounded-lg border bg-violet-500 text-white hover:bg-red-500"
              >
                No
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfilePostCard;
